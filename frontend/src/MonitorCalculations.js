import { Image, StyleSheet} from "react-native";

export const calculateENMO = (accel_x, accel_y, accel_z) => {
    
    let enmoValue;
    let enmoPosition;

    // averages for x, y, and z components
    const accel_avg = Math.sqrt(accel_x ** 2 + accel_y ** 2 + accel_z ** 2);
    
    enmoValue = accel_avg - 9.81;

    // assign position for caret
    if (enmoValue < .1) {
        enmoPosition = 45;
    }
    else if (enmoValue >= .1 && enmoValue < .2) {
        enmoPosition = 145;
    }
    else if (enmoValue >= .20 && enmoValue <= .3) {
        enmoPosition = 245;
    }
    else if (enmoValue > .3) {
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
      result.position = 365; // Position for the lower red bar
    } else if (hr > 40 && hr <= 50) {
      result.color = "orange";
      result.position = 286.7857; // Position for the lower orange bar
    } else if (hr > 50 && hr < 60) {
      result.color = "yellow";
      result.position = 234.6429; // Position for the lower yellow bar
    } else if (hr >= 60 && hr <= 100) {
      result.color = "green";
      result.position = 195.5357; // Position for the green bar
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

export const calculateSPO2 = (ac_red, dc_red, ac_ir, dc_ir, k) => {
    let result = {
        color: "",
        position: 0,
        spo2: 0,
    };
    const r = (ac_red/dc_red)/(ac_ir/dc_ir);
    const spo2 = (k * r) * 100;

    if (spo2 <= 94) {
      result.color = "red";
      result.position = 365; // Position for the lower red bar
      result.spo2 = spo2;
    } 
    else if (spo2 > 94 && spo2 <= 94.5) {
      result.color = "orange";
      result.position = 286.7857; // Position for the lower orange bar
      result.spo2 = spo2;
    } 
    else if (spo2 > 94.5 && spo2 < 95) {
      result.color = "yellow";
      result.position = 234.6429; // Position for the lower yellow bar
      result.spo2 = spo2;
    } 
    else if (spo2 >= 95 && spo2 <= 100) {
      result.color = "green";
      result.position = 195.5357; // Position for the green bar
      result.spo2 = spo2;
    } 
    else if (spo2 >= 100) {
      result.color = "red";
      result.position = 26.0714; // Position for the upper red bar
      result.spo2 = spo2;
    }
    else {
        result.color = "unknown";
        result.position = 0; // Default position
        result.spo2 = spo2;
    }
    return result;
};

export const calculateGSR = (gsr) => {
    let result = {
        color: "",
        position: 0,
    };
    
    if (gsr < 500) {
      result.color = "red";
      result.position = 365; // Position for the lower red bar
    } 
    else if (gsr >= 500 && gsr <= 700) {
      result.color = "green";
      result.position = 195.5357; // Position for the green bar
    } 
    else if (gsr > 700) {
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

export const convertTemp = (temperature) => {
  const f_temp = (temperature * (9/5)) + 32;
  return f_temp;
};

const styles = StyleSheet.create({
    image: {
      height: 100,
      width: 100,
      margin: 10,
    },
});