import { Image, StyleSheet} from "react-native";

export const calculateENMO = (acceleration_x, acceleration_y, acceleration_z) => {
    
    let enmoValue;
    let enmoPosition;

    // averages for x, y, and z components
    const accel_avg = Math.sqrt(acceleration_x ** 2 + acceleration_y ** 2 + acceleration_z ** 2);
    
    // weighting factors
    // const w_hr = 0.15;
    // const w_spo2 = 0.1;
    // const w_gsr = 0.1;
    // const w_temp = 0.1;
    // const w_press = 0.1;
    // const w_humidity = 0.1;
    // const w_accel = 0.1;
    // const w_gyro = 0.1;
    // const w_magnetic = 0.05;    

    // calculate ENMO value
    // enmoValue = (w_hr * hr) + (w_spo2 * spo2) + (w_gsr * gsr_average) + (w_temp * temperature) +
    //              (w_press * pressure) + (w_humidity * humidity) + (w_accel * accel_avg) +
    //              (w_gyro * gyro_avg) + (w_magnetic * magnetic_avg);

    enmoValue = accel_avg - 9.81;

    // assign position for caret
    if (enmoValue < 10) {
        enmoPosition = 45;
    }
    else if (enmoValue >= 10 && enmoValue < 50) {
        enmoPosition = 145;
    }
    else if (enmoValue >= 50 && enmoValue <= 150) {
        enmoPosition = 245;
    }
    else if (enmoValue > 150) {
        enmoPosition = 345;
    }
    else {
        enmoPosition = 0;
    } 

    return { enmoValue, enmoPosition };
}

export const calculateHeartRate = (hr) => {
    let result = {
      color: "",
      position: 0,
    };
  
    if (hr <= 40) {
      result.color = "red";
      result.position = 338.9286; // Position for the lower red bar
    } else if (hr > 40 && hr <= 50) {
      result.color = "orange";
      result.position = 286.7857; // Position for the lower orange bar
    } else if (hr > 50 && hr < 60) {
      result.color = "yellow";
      result.position = 234.6429; // Position for the lower yellow bar
    } else if (hr >= 60 && hr <= 100) {
      result.color = "green";
      result.position = 182.5; // Position for the green bar
    } else if (hr > 100 && hr < 130) {
      result.color = "yellow";
      result.position = 130.3571; // Position for the upper yellow bar
    } else if (hr >= 130 && hr < 170) {
      result.color = "orange";
      result.position = 78.2143; // Position for the upper orange bar
    } else if (hr >= 170) {
      result.color = "red";
      result.position = 26.0714; // Position for the upper red bar
    } else {
      result.color = "unknown";
      result.position = 0; // Default position
    }
  
    return result;
};

export const calculateSPO2 = (spo2) => {
    let result = {
        color: "",
        position: 0,
    };

    if (spo2 <= 94) {
      result.color = "red";
      result.position = 338.9286; // Position for the lower red bar
    } 
    else if (spo2 > 94 && spo2 <= 94.5) {
      result.color = "orange";
      result.position = 286.7857; // Position for the lower orange bar
    } 
    else if (spo2 > 94.5 && spo2 < 95) {
      result.color = "yellow";
      result.position = 234.6429; // Position for the lower yellow bar
    } 
    else if (spo2 >= 95 && spo2 <= 100) {
      result.color = "green";
      result.position = 182.5; // Position for the green bar
    } 
    else if (spo2 >= 100) {
      result.color = "red";
      result.position = 26.0714; // Position for the upper red bar
    }
    else {
        result.color = "unknown";
        result.position = 0; // Default position
    }
    
    return result;
};

export const calculateGSR = (gsr) => {
    let result = {
        color: "",
        position: 0,
    };
    
    if (gsr < 10) {
      result.color = "red";
      result.position = 338.9286; // Position for the lower red bar
    } 
    else if (gsr >= 10 && gsr <= 50) {
      result.color = "green";
      result.position = 182.5; // Position for the green bar
    } 
    else if (gsr > 50) {
      result.color = "red";
      result.position = 26.0714; // Position for the upper red bar
    }
    else {
        result.color = "unknown";
        result.position = 0; // Default position
    }
    
    return result;
};

// set the emoji and stress level string
export const determineStressLevel = (color1, color2, color3) => {
    const colorSet = new Set([color1, color2, color3]);

    let stress;
    let image;
  
    if (colorSet.size === 1) {
      // All colors are the same
      const color = colorSet.values().next().value;
      if (color === "green") {
        stress = "Low";
        image = <Image source={require('../src/components/images/green.png')} style={styles.image} />;
      } else if (color === "red") {
        stress = "Very High";
        image = <Image source={require('../src/components/images/red.png')} style={styles.image} />;
      } else if (color === "orange") {
        stress = "High";
        image = <Image source={require('../src/components/images/orange.png')} style={styles.image} />;
      } else if (color === "yellow") {
        stress = "Moderate";
        image = <Image source={require('../src/components/images/yellow.png')} style={styles.image} />;
      }
    }
    else if (colorSet.has("red") && (colorSet.has("orange") || colorSet.has("yellow"))) {
        stress = "Very High";
        image = <Image source={require('../src/components/images/red.png')} style={styles.image} />;
    }
    else if (colorSet.has("orange") && colorSet.has("orange")) {
        stress = "High";
        image = <Image source={require('../src/components/images/orange.png')} style={styles.image} />;
    }
    else if (colorSet.has("red")) {
        stress = "Very High";
        image = <Image source={require('../src/components/images/red.png')} style={styles.image} />;
    }
    else if (colorSet.has("orange")) {
        stress = "High";
        image = <Image source={require('../src/components/images/orange.png')} style={styles.image} />;
    }
    else if (colorSet.has("yellow")) {
        stress = "Moderate";
        image = <Image source={require('../src/components/images/yellow.png')} style={styles.image} />;
    }
    else {
        stress = "Unknown!";
        image = <Image source={require('../src/components/images/default.png')} style={styles.image} />;
    }

    return { stress, image };
};

const styles = StyleSheet.create({
    image: {
      height: 100,
      width: 100,
      margin: 10,
    },
});