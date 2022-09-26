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


    /*
    GUID Format:
    0000XXYY-1212-EFDE-1523-785FEABCD123
    XX - Service ID
    YY - Characteristic ID
    Services should set their Characteristic ID to 00
    */

    Guid opticalUUID = new Guid("00000100-1212-EFDE-1523-785FEABCD123");
    private IService opticalServ;

    string proximity = "0";
    private ICharacteristic proxChar;
    Guid proxUUID = new Guid("00000101-1212-EFDE-1523-785FEABCD123");

    string red = "0";
    string green = "0";
    string blue = "0";
    string clear = "0";
    private ICharacteristic rgbChar;
    Guid rgbUUID = new Guid("00000102-1212-EFDE-1523-785FEABCD123");
        
    Guid envUUID = new Guid("00000200-1212-EFDE-1523-785FEABCD123");
    private IService envServ;

    string temperature = "0";
    string pressure = "0";
    string altitude = "0";
    private ICharacteristic baroChar;
    Guid baroUUID = new Guid("00000201-1212-EFDE-1523-785FEABCD123");

    string humidity = "0";
    private ICharacteristic humidChar;
    Guid humidUUID = new Guid("00000202-1212-EFDE-1523-785FEABCD123");

    Guid motionUUID = new Guid("00000300-1212-EFDE-1523-785FEABCD123");
    private IService motionServ;

    string magnetometerX = "0";
    string magnetometerY = "0";
    string magnetometerZ = "0";
    private ICharacteristic magChar;
    Guid magUUID = new Guid("00000301-1212-EFDE-1523-785FEABCD123");

    string accelerationX = "0";
    string accelerationY = "0";
    string accelerationZ = "0";
    private ICharacteristic accelChar; 
    Guid accelUUID = new Guid("00000302-1212-EFDE-1523-785FEABCD123");

    string gyroX = "0";
    string gyroY = "0";
    string gyroZ = "0";
    private ICharacteristic gyroChar;
    Guid gyroUUID = new Guid("00000303-1212-EFDE-1523-785FEABCD123");

    Guid otherUUID = new Guid("00000400-1212-EFDE-1523-785FEABCD123");
    private IService otherServ;

    string mic = "0";
    private ICharacteristic micChar;
    Guid micUUID = new Guid("00000401-1212-EFDE-1523-785FEABCD123");

    string heartrate = "0";
    string confidence = "0";
    string oxygen = "0";
    string status = "0";
    private ICharacteristic ppgChar;
    Guid ppgUUID = new Guid("00000402-1212-EFDE-1523-785FEABCD123");

    string gsr = "0";
    private ICharacteristic gsrChar;
    Guid gsrUUID = new Guid("00000403-1212-EFDE-1523-785FEABCD123");

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

          opticalServ = await arduino.GetServiceAsync(opticalUUID);
          if (opticalServ == null) { Debug.WriteLine("Failed for\t" + opticalUUID.ToString()); return; }
          Debug.WriteLine("Looking for characteristics for " + opticalServ.Id + "...");

          proxChar = await opticalServ.GetCharacteristicAsync(proxUUID);
          if (proxChar == null) { Debug.WriteLine("Failed for:\t" + proxUUID.ToString()); return; }
          proxChar.ValueUpdated += async (s, a) =>
          {
            if (proxChar == null) { Debug.WriteLine("characteristic is null..."); return; }
            Proximity = System.Text.Encoding.ASCII.GetString(proxChar.Value);
          };
          await proxChar.StartUpdatesAsync();

          rgbChar = await opticalServ.GetCharacteristicAsync(rgbUUID);
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
              
          envServ = await arduino.GetServiceAsync(envUUID);
          if (envServ == null) { Debug.WriteLine("Failed for:\t" + envUUID.ToString()); return; }
          Debug.WriteLine("Looking for characteristics for " + envServ.Id + "...");

          baroChar = await envServ.GetCharacteristicAsync(baroUUID);
          if (baroChar == null) { Debug.WriteLine("Failed for:\t" + baroUUID.ToString()); return; }
          baroChar.ValueUpdated += async (s, a) =>
          {
            if (baroChar == null) { Debug.WriteLine("characteristic is null..."); return; }
            var baroParse = System.Text.Encoding.ASCII.GetString(baroChar.Value).Split(' ');
            if (baroParse.Length >= 3) 
            {
              Temperature = baroParse[0];
              Pressure = baroParse[1];
              Altitude = baroParse[2];
            } else {
              Temperature = "0";
              Pressure = "0";
              Altitude = "0";
            }
          };
          await baroChar.StartUpdatesAsync();

          humidChar = await envServ.GetCharacteristicAsync(humidUUID);
          if (humidChar == null) { Debug.WriteLine("Failed for:\t" + humidUUID.ToString()); return; }
          humidChar.ValueUpdated += async (s, a) =>
          {
            if (humidChar == null) { Debug.WriteLine("characteristic is null..."); return; }
            Humidity = System.Text.Encoding.ASCII.GetString(humidChar.Value);
          };
          await humidChar.StartUpdatesAsync();

          motionServ = await arduino.GetServiceAsync(motionUUID);
          if (motionServ == null) { Debug.WriteLine("Failed for:\t" + motionUUID.ToString()); return; }
          Debug.WriteLine("Looking for characteristics for " + motionServ.Id + "...");

          magChar = await motionServ.GetCharacteristicAsync(magUUID);
          if (magChar == null) { Debug.WriteLine("Failed for:\t" + magUUID.ToString()); return; }
          magChar.ValueUpdated += async (s, a) =>
          {
            if (magChar == null) { Debug.WriteLine("characteristic is null..."); return; }
            var magParse = System.Text.Encoding.ASCII.GetString(magChar.Value).Split(' ');
            if (magParse.Length >= 3)
            {
              MagnetometerX = magParse[0];
              MagnetometerY = magParse[1];
              MagnetometerZ = magParse[2];
            }
            else
            {
              MagnetometerX = "0";
              MagnetometerY = "0";
              MagnetometerZ = "0";
            }
          };
          await magChar.StartUpdatesAsync();

          accelChar = await motionServ.GetCharacteristicAsync(accelUUID);
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

          gyroChar = await motionServ.GetCharacteristicAsync(gyroUUID);
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

          micChar = await otherServ.GetCharacteristicAsync(micUUID);
          if (micChar == null) { Debug.WriteLine("Failed for:\t" + micUUID.ToString()); return; }
          micChar.ValueUpdated += async (s, a) =>
          {
            if (micChar == null) { Debug.WriteLine("characteristic is null..."); return; }
            Mic = System.Text.Encoding.ASCII.GetString(micChar.Value);
          };
          await micChar.StartUpdatesAsync();

          ppgChar = await otherServ.GetCharacteristicAsync(ppgUUID);
          if (ppgChar == null) { Debug.WriteLine("Failed for:\t" + ppgUUID.ToString()); return; }
          ppgChar.ValueUpdated += async (s, a) =>
          {
            if (ppgChar == null) { Debug.WriteLine("characteristic is null..."); return; }
            var ppgParse = System.Text.Encoding.ASCII.GetString(ppgChar.Value).Split(' ');
            if (ppgParse.Length >= 4)
            {
              Heartrate = ppgParse[0];
              Confidence = ppgParse[1];
              Oxygen = ppgParse[2];
              Status = ppgParse[3];
            }
            else
            {
              Heartrate = "0";
              Confidence = "0";
              Oxygen = "0";
              Status = "0";
            }
          };
          await ppgChar.StartUpdatesAsync();

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
        /*
        Modify this if connecting to a different Feather
        GUID Format:
        00000000-0000-0000-0000-AABBCCDDEEFF
        Change AABBCCDDEEFF to the MAC Address of your feather
        This can be usually seen in bluetooth settings, with format AA:BB:CC:DD:EE:FF
        */
        await adapter.ConnectToKnownDeviceAsync(new Guid("00000000-0000-0000-0000-cc3e33c270be"), cancellationToken);
      });
    }

    // TODO: Figure out what this line do
    // public event PropertyChangedEventHandler PropertyChanged;
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
    public string Pressure
    {
      get { return pressure; }
      set { SetProperty(ref pressure, value); }
    }
    public string Altitude
    {
      get { return altitude; }
      set { SetProperty(ref altitude, value); }
    }
    public string MagnetometerX
    {
      get { return magnetometerX; }
      set { SetProperty(ref magnetometerX, value); }
    }
    public string MagnetometerY
    {
      get { return magnetometerY; }
      set { SetProperty(ref magnetometerY, value); }
    }
    public string MagnetometerZ
    {
      get { return magnetometerZ; }
      set { SetProperty(ref magnetometerZ, value); }
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
    public string Heartrate
    {
      get { return heartrate; }
      set { SetProperty(ref heartrate, value); }
    }
    public string Confidence
    {
      get { return confidence; }
      set { SetProperty(ref confidence, value); }
    }
    public string Oxygen
    {
      get { return oxygen; }
      set { SetProperty(ref oxygen, value); }
    }
    public string Status
    {
      get { return status; }
      set { SetProperty(ref status, value); }
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
