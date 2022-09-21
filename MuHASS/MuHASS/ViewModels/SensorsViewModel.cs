using System;
using System.Windows.Input;
using System.ComponentModel;
using System.Runtime.CompilerServices;
using Xamarin.Essentials;
using Xamarin.Forms;
using Plugin.BLE;
using System.Diagnostics;
using Plugin.BLE.Abstractions;
using Plugin.BLE.Abstractions.Contracts;
using Plugin.BLE.Abstractions.Exceptions;
using System.Threading;

namespace MuHASS.ViewModels
{
  public class SensorsViewModel : BaseViewModel
  {
    IBluetoothLE ble = CrossBluetoothLE.Current;
    IAdapter adapter = CrossBluetoothLE.Current.Adapter;
    private IDevice arduino;
    ConnectParameters cancellationToken = new ConnectParameters();


    // nrf52840
    Guid adpsUUID = new Guid("00000100-1212-EFDE-1523-785FEABCD123");
    private IService adpsServ;

    string proximity = "0";
    string mic = "0";
    private ICharacteristic pmChar;
    Guid pmUUID = new Guid("00000101-1212-EFDE-1523-785FEABCD123");

    string red = "0";
    string green = "0";
    string blue = "0";
    string clear = "0";
    private ICharacteristic rgbChar;
    Guid rgbUUID = new Guid("00000102-1212-EFDE-1523-785FEABCD123");

    string temperature = "0";
    string altitude = "0";
    string humidity = "0";
    private ICharacteristic tahChar;
    Guid tahUUID = new Guid("00000103-1212-EFDE-1523-785FEABCD123");

    string barometricPreasure = "0";
    private ICharacteristic presChar;
    Guid presUUID = new Guid("00000104-1212-EFDE-1523-785FEABCD123");

    Guid posUUID = new Guid("00000200-1212-EFDE-1523-785FEABCD123");
    private IService posServ;

    string magnometerY = "0";
    string magnometerX = "0";
    string magnometerZ = "0";
    private ICharacteristic magChar;
    Guid magUUID = new Guid("00000201-1212-EFDE-1523-785FEABCD123");

    string accelerationX = "0";
    string accelerationY = "0";
    string accelerationZ = "0";
    private ICharacteristic accelChar;
    Guid accelUUID = new Guid("00000202-1212-EFDE-1523-785FEABCD123");

    string gyroX = "0";
    string gyroY = "0";
    string gyroZ = "0";
    private ICharacteristic gyroChar;
    Guid gyroUUID = new Guid("00000203-1212-EFDE-1523-785FEABCD123");


    Guid otherUUID = new Guid("00000300-1212-EFDE-1523-785FEABCD123");
    private IService otherServ;

    string hr = "0";
    string vhr = "0";
    string spO2 = "0";
    string vspO2 = "0";
    private ICharacteristic hrChar;
    Guid hrUUID = new Guid("00000301-1212-EFDE-1523-785FEABCD123");

    string gsr = "0";
    private ICharacteristic gsrChar;
    Guid gsrUUID = new Guid("00000302-1212-EFDE-1523-785FEABCD123");



    public SensorsViewModel()
    {
      Title = "Sensors";
      adapter.ScanMode = ScanMode.LowLatency;
      ble.StateChanged += (s, e) =>
      {
        Debug.WriteLine($"The Bluetooth has changed to {e.NewState}");
      };


      adapter.DeviceConnected += async (t,b) =>
      {
        arduino = b.Device;
        try
        {
          Debug.WriteLine("Looking for service for " + arduino.Name + "...");
          var servs = await arduino.GetServicesAsync();
          foreach (var serv in servs)
            Debug.WriteLine("Name:\t" + serv.Name + "\t\tId:" + serv.Id);

          adpsServ = await arduino.GetServiceAsync(adpsUUID);
          if (adpsServ == null) { Debug.WriteLine("Failed for\t" + adpsUUID.ToString()); return; }
          Debug.WriteLine("Looking for characteristics for " + adpsServ.Id + "...");

          pmChar = await adpsServ.GetCharacteristicAsync(pmUUID);
          if (pmChar == null) { Debug.WriteLine("Failed for:\t" + pmUUID.ToString()); return; }
          pmChar.ValueUpdated += async (s, a) =>
          {
            if (pmChar == null) { Debug.WriteLine("characteristic is null..."); return; }
            var pmParse = System.Text.Encoding.ASCII.GetString(pmChar.Value).Split(' ');
            if (pmParse.Length >= 2)
            {
              Proximity = pmParse[0];
              Mic = pmParse[1];
            }
            else
            {
              Proximity = "0";
              Mic = "0";
            }
          };
          await pmChar.StartUpdatesAsync();

          rgbChar = await adpsServ.GetCharacteristicAsync(rgbUUID);
          if (rgbChar == null) { Debug.WriteLine("Failed for:\t" + rgbUUID.ToString()); return; }
          rgbChar.ValueUpdated += async (s, a) =>
          {
            if (rgbChar == null) { Debug.WriteLine("characteristic is null..."); return; }
            var rgbParse = System.Text.Encoding.ASCII.GetString(rgbChar.Value).Split(' ');
            if (rgbParse.Length >= 4) 
            {
              Red = rgbParse[0];
              Green = rgbParse[1];
              Blue = rgbParse[2];
              Clear = rgbParse[3];
            } else {
              Red = "0";
              Green = "0";
              Blue = "0";
              Clear = "0";
            }
          };
          await rgbChar.StartUpdatesAsync();

          tahChar = await adpsServ.GetCharacteristicAsync(tahUUID);
          if (tahChar == null) { Debug.WriteLine("Failed for:\t" + tahUUID.ToString()); return; }
          tahChar.ValueUpdated += async (s, a) =>
          {
            if (tahChar == null) { Debug.WriteLine("characteristic is null..."); return; }
            var tahParse = System.Text.Encoding.ASCII.GetString(tahChar.Value).Split(' ');
            if (tahParse.Length >= 3)
            {
              Temperature = tahParse[0];
              Altitude = tahParse[1];
              Humidity = tahParse[2];
            }
            else
            {
              Temperature = "0";
              Altitude = "0";
              Humidity = "0";
            }
          };
          await tahChar.StartUpdatesAsync();

          presChar = await adpsServ.GetCharacteristicAsync(presUUID);
          if (presChar == null) { Debug.WriteLine("Failed for:\t" + presUUID.ToString()); return; }
          presChar.ValueUpdated += async (s, a) =>
          {
            if (presChar == null) { Debug.WriteLine("characteristic is null..."); return; }
            BarometricPressure = System.Text.Encoding.ASCII.GetString(presChar.Value);
          };
          await presChar.StartUpdatesAsync();


          posServ = await arduino.GetServiceAsync(posUUID);
          if (posServ == null) { Debug.WriteLine("Failed for:\t" + posUUID.ToString()); return; }
          Debug.WriteLine("Looking for characteristics for " + posServ.Id + "...");


          magChar = await posServ.GetCharacteristicAsync(magUUID);
          if (magChar == null) { Debug.WriteLine("Failed for:\t" + magUUID.ToString()); return; }
          magChar.ValueUpdated += async (s, a) =>
          {
            if (magChar == null) { Debug.WriteLine("characteristic is null..."); return; }
            var magParse = System.Text.Encoding.ASCII.GetString(magChar.Value).Split(' ');
            if (magParse.Length >= 3)
            {
              MagnometerX = magParse[0];
              MagnometerY = magParse[1];
              MagnometerZ = magParse[2];
            }
            else
            {
              MagnometerX = "0";
              MagnometerY = "0";
              MagnometerZ = "0";
            }
          };
          await magChar.StartUpdatesAsync();

          accelChar = await posServ.GetCharacteristicAsync(accelUUID);
          if (accelChar == null) { Debug.WriteLine("Failed for:\t" + accelUUID.ToString()); return; }
          accelChar.ValueUpdated += async (s, a) =>
          {
            if (accelChar == null) { Debug.WriteLine("characteristic is null..."); return; }
            var accelParse = System.Text.Encoding.ASCII.GetString(accelChar.Value).Split(' ');
            if (accelParse.Length >= 3)
            {
              AccelerationX = accelParse[0];
              AccelerationY = accelParse[1];
              AccelerationZ = accelParse[2];
            }
            else
            {
              AccelerationX = "0";
              AccelerationY = "0";
              AccelerationZ = "0";
            }
          };
          await accelChar.StartUpdatesAsync();

          gyroChar = await posServ.GetCharacteristicAsync(gyroUUID);
          if (gyroChar == null) { Debug.WriteLine("Failed for:\t" + gyroUUID.ToString()); return; }
          gyroChar.ValueUpdated += async (s, a) =>
          {
            if (gyroChar == null) { Debug.WriteLine("characteristic is null..."); return; }
            var gyroParse = System.Text.Encoding.ASCII.GetString(gyroChar.Value).Split(' ');
            if (gyroParse.Length >= 3)
            {
              GyroX = gyroParse[0];
              GyroY = gyroParse[1];
              GyroZ = gyroParse[2];
            }
            else
            {
              GyroX = "0";
              GyroY = "0";
              GyroZ = "0";
            }
          };
          await gyroChar.StartUpdatesAsync();

          otherServ = await arduino.GetServiceAsync(otherUUID);
          if (otherServ == null) { Debug.WriteLine("Failed for:\t" + otherUUID.ToString()); return; }
          Debug.WriteLine("Looking for characteristics for " + otherServ.Id + "...");

          hrChar = await otherServ.GetCharacteristicAsync(hrUUID);
          if (hrChar == null) { Debug.WriteLine("Failed for:\t" + hrUUID.ToString()); return; }
          hrChar.ValueUpdated += async (s, a) =>
          {
            if (hrChar == null) { Debug.WriteLine("characteristic is null..."); return; }
            var hrParse = System.Text.Encoding.ASCII.GetString(hrChar.Value).Split(' ');
            if (hrParse.Length >= 4)
            {
              HR = hrParse[0];
              VHR = hrParse[1];
              SPO2 = hrParse[2];
              VSPO2 = hrParse[3];
            }
            else
            {
              HR = "0";
              VHR = "0";
              SPO2 = "0";
              VSPO2 = "0";
            }
          };
          await hrChar.StartUpdatesAsync();

          gsrChar = await otherServ.GetCharacteristicAsync(gsrUUID);
          if (gsrChar == null) { Debug.WriteLine("Failed for:\t" + gsrUUID.ToString()); return; }
          gsrChar.ValueUpdated += async (s, a) =>
          {
            if (gsrChar == null) { Debug.WriteLine("characteristic is null..."); return; }
            GSR = System.Text.Encoding.ASCII.GetString(gsrChar.Value);
          };
          await gsrChar.StartUpdatesAsync();

        }
        catch (DeviceConnectionException e)
        {
          Debug.WriteLine(e);
        }
      };

      adapter.DeviceDiscovered += (s, a) => {
        Debug.WriteLine("Name:" + a.Device.Name);
      };

      ConnectBluetoothCommand = new Command(async () => {
        var devs = adapter.GetSystemConnectedOrPairedDevices();
        Debug.WriteLine("Initiating scan...");
        foreach (var dev in devs)
          Debug.WriteLine("Name" + dev.Name + "\t\tId:" + dev.Id);
        // nrf52 MuHASS
        await adapter.ConnectToKnownDeviceAsync(new Guid("00000000-0000-0000-0000-cf4464ab7f65"), cancellationToken);
      });
    }

    public event PropertyChangedEventHandler PropertyChanged;
    public ICommand ChangeText { get; }
    public ICommand ConnectBluetoothCommand { get; }

    public string Proximity
    {
      get { return proximity; }
      set { SetProperty(ref proximity, value); }
    }
    public string Red
    {
      get { return red; }
      set { SetProperty(ref red, value); }
    }
    public string Green
    {
      get { return green; }
      set { SetProperty(ref green, value); }
    }
    public string Blue
    {
      get { return blue; }
      set { SetProperty(ref blue, value); }
    }
    public string Clear
    {
      get { return clear; }
      set { SetProperty(ref clear, value); }
    }
    public string Temperature
    {
      get { return temperature; }
      set { SetProperty(ref temperature, value); }
    }
    public string BarometricPressure
    {
      get { return barometricPreasure; }
      set { SetProperty(ref barometricPreasure, value); }
    }
    public string Altitude
    {
      get { return altitude; }
      set { SetProperty(ref altitude, value); }
    }
    public string MagnometerX
    {
      get { return magnometerX; }
      set { SetProperty(ref magnometerX, value); }
    }
    public string MagnometerY
    {
      get { return magnometerY; }
      set { SetProperty(ref magnometerY, value); }
    }
    public string MagnometerZ
    {
      get { return magnometerZ; }
      set { SetProperty(ref magnometerZ, value); }
    }
    public string AccelerationX
    {
      get { return accelerationX; }
      set { SetProperty(ref accelerationX, value); }
    }
    public string AccelerationY
    {
      get { return accelerationY; }
      set { SetProperty(ref accelerationY, value); }
    }
    public string AccelerationZ
    {
      get { return accelerationZ; }
      set { SetProperty(ref accelerationZ, value); }
    }
    public string GyroX
    {
      get { return gyroX; }
      set { SetProperty(ref gyroX, value); }
    }
    public string GyroY
    {
      get { return gyroY; }
      set { SetProperty(ref gyroY, value); }
    }
    public string GyroZ
    {
      get { return gyroZ; }
      set { SetProperty(ref gyroZ, value); }
    }
    public string Humidity
    {
      get { return humidity; }
      set { SetProperty(ref humidity, value); }
    }
    public string Mic
    {
      get { return mic; }
      set { SetProperty(ref mic, value); }
    }
    public string HR
    {
      get { return hr; }
      set { SetProperty(ref hr, value); }
    }
    public string VHR
    {
      get { return vhr; }
      set { SetProperty(ref vhr, value); }
    }
    public string SPO2
    {
      get { return spO2; }
      set { SetProperty(ref spO2, value); }
    }
    public string VSPO2
    {
        get { return vspO2; }
        set { SetProperty(ref vspO2, value); }
    }
    public string GSR
    {
      get { return gsr; }
      set { SetProperty(ref gsr, value); }
    }

    bool SetProperty<T>(ref T storage, T value, [CallerMemberName] string propertyName = null)
    {
      if (Object.Equals(storage, value))
        return false;

      storage = value;
      OnPropertyChanged(propertyName);
      return true;
    }
  }
}
