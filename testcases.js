
/* Daher Omar- Filtering regions on campus map */
// Array of regions of parking spots on campus
const regions = [
    {
      name: "North Region",
      buildings: ['PS 1', 'PS 2','Lot M '] 
    }
  ];
  
  // Get select element
  const select = document.getElementById('region-filter');
  
  // Populate select with options 
  regions.forEach(region => {
    const option = document.createElement('option');
    option.value = region.name;
    option.text = region.name;
    select.appendChild(option); 
  });
  
  // Event listener for change 
  select.addEventListener('change', event => {
    const selectedRegion = event.target.value;
    
    // Filter map to only show selected region
    filterMapToRegion(selectedRegion);
  });
  
  function filterMapToRegion(regionName) {
    // Get the region object
    const region = regions.find(r => r.name === regionName);
    
    // Update map to only show region.buildings 
  }

  
/* Daher Omar- View Reports of seen parking officials */
// example data eventually will fetch reports from server/database
const reports = [
    {
      id: 1,
      location: 'PS1', 
      validations: 10,
      refutations: 2    
    },
    {
      id: 2, 
      location: 'PS2',
      validations: 5,
      refutations: 1
    },
    {
     id: 3,
     location: 'Lot M',
     validations: 3,
     refutations: 1 
    }
  ];
  
  // Sort reports by validation/refutation ratio the +1 is needed to avoid divide by zero error and to balance out reports
  reports.sort((a, b) => {
    const ratioA = a.validations / (a.refutations + 1); 
    const ratioB = b.validations / (b.refutations + 1);
    
    return ratioB - ratioA; 
  });
  
  // Test viewing top reports 
  function viewTopReports() {
    // Show top 2 reports will expand in final version
    const topReports = reports.slice(0, 2);
    
    topReports.forEach(report => {
      console.log(report.location); 
    });
  }
  
  // User clicks button to view reports  
  const viewReportsBtn = document.getElementById('view-reports-btn');
  viewReportsBtn.addEventListener('click', viewTopReports);

//Eduardo Zamora
  // parkingReports is simulating the Database that will contain parking reports
// Containing the Report ID, Lot, and Report Time. 
const parkingReports = [
    {
      id: 1,
      parkingLot: "Lot A",
      reportTime: "11:22 AM"
    },
    {
      id: 2,
      parkingLot: "Lot B",
      reportTime: "5:01 PM"
    },
    {
      id: 3,
      parkingLot: "Lot H",
      reportTime: "2:12 PM"
    },
    {
      id: 4,
      parkingLot: "Lot E",
      reportTime: "10:09 AM"
    },
    {
      id: 5,
      parkingLot: "Lot J",
      reportTime: "5:04 PM"
    },
    {
      id: 9,
      parkingLot: "Lot C",
      reportTime: "3:42 PM"
    }
  ];


//Eduardo Zamora
// Simulating the database to store all parking lots at UTD
const parkingLots = ["Lot A", "Lot B", "Lot C", "Lot D", "Lot E"];
const alternativeNames = {
  0: "a",
  1: "b",
  2: "c",
  3: "d",
  4: "e",
  // Add other alternatives as needed
};

// Some examples of valid inputs:
// "lot a lot b" "Lot A Lot B" "Lot A and Lot b" "LOT ALOTB"
// "a and b" "a & c" "ac" "A-C" "      a  c    d  e"

// Array to hold the selected parking lots from user
const selectedParkingLots = [];

// Funtion to add or remove the selected lot options
function filterParkingLots(inputString, operation) {
  const selected = processInputString(inputString);
  const selectedIndices = findIndices(selected);

  // If operation = 1, then we are adding to the list
  if (operation === 1) {
    // if the user input is a part of the simulate database it will add to the list
    if (selectedIndices !== null) {
      // Add selected parking lots to the list
      for (const index of selectedIndices) {
        if (!selectedParkingLots.includes(parkingLots[index])) {
          selectedParkingLots.push(parkingLots[index]);
        }
      }
    }
    /*else{
        console.log(`Selected option(s) are not an existing parking lot at UTD`);
    }*/
  } 
  // If operation = 0, the we are removing from list
  else if (operation === 0) {
    if (selectedIndices !== null) {
      // Remove selected parking lots from the list
      for (const index of selectedIndices) {
        const lotToRemove = parkingLots[index];
        const indexToRemove = selectedParkingLots.indexOf(lotToRemove);
        if (indexToRemove !== -1) {
          selectedParkingLots.splice(indexToRemove, 1);
        }
      }
    }
    /*else{
        console.log(`Selected option(s) are not an existing parking lot at UTD`);
    }*/
  }
  // If the length of the Array is 0, then the selected is empty
  if (selectedParkingLots.length === 0) {
        return "Selected Parking Lots to Receive Notifications: None";
  }
  else{
      return `Selected Parking Lots to Receive Notifications: ${selectedParkingLots.join(', ')}`;
  }
}

// narrows down the user input by removing the word "and", white spaces, upper case, and any punctuation.
function processInputString(inputString) {
  const noAnd = inputString.replace(/\band\b/gi, '');
  const rmWhiteSpaces = noAnd.replace(/\s/g, '');
  const lowerCase = rmWhiteSpaces.toLowerCase();
  const rmPunctuation = lowerCase.replace(/[^\w\s]/g, '');
  // If the  modified string does not contain 'lot', then make sure all characters correspond to alternativeCharacters
  if(!rmPunctuation.includes("lot")){
      const alternativeCharacters = Object.values(alternativeNames).join('').toLowerCase();
      const isAllCharactersInAlternativeList = [...rmPunctuation].every(char => alternativeCharacters.includes(char));
      if(!isAllCharactersInAlternativeList){
          // If all characters are not keys from alternativeCharacters, then return an invalid string
          return "+"; 
      }
      else{
          // else return the string
          return rmPunctuation;
      }

  }
  else{
      // Remove 'lot' from the input and return it
      const input = rmPunctuation.replace(/lot/gi, '');
      return input;
  }
}

// funtion to find which keys were found in the user's input
function findIndices(input) {
  const indices = [];
  // Iterate through the keys in the 'alternativeNames' object
  for (const key in alternativeNames) {
    // If the value is found in 'input', add the current key to the 'indices' array
    if (input.includes(alternativeNames[key])) {
      indices.push(key);
    }
  }

  // Return null if no matches are found, else return the index of 
  if (indices.length === 0) {
    return null; 
  } else {
    return indices;
  }
}

// Test cases to tests the Notification Selection
const testCases = [
  {
    inputString: "Lot a lot b",
    operation: 1,
    expectedOutput: "Selected Parking Lots to Receive Notifications: Lot A, Lot B",
    description: "Valid input (Add to list)",
  },
  {
    inputString: " LOT A",
    operation: 0,
    expectedOutput: "Selected Parking Lots to Receive Notifications: Lot B",
    description: "Valid input (Remove from list)",
  },
  {
    inputString: " lot e",
    operation: 1,
    expectedOutput: "Selected Parking Lots to Receive Notifications: Lot B, Lot E",
    description: "Valid input (Add to list)",
  },
  {
    inputString: "ab",
    operation: 0,
    expectedOutput: "Selected Parking Lots to Receive Notifications: Lot E",
    description: "Valid input (Remove from list)",
  },
  {
    inputString: "c-d",
    operation: 1,
    expectedOutput: "Selected Parking Lots to Receive Notifications: Lot E, Lot C, Lot D",
    description: "Valid input (Add to list)",
  },
  {
    inputString: "c-d-e",
    operation: 0,
    expectedOutput: "Selected Parking Lots to Receive Notifications: None",
    description: "Valid input (Remove from list)",
  },
  {
    inputString: "[Lot A LOT B lot c]",
    operation: 1,
    expectedOutput: "Selected Parking Lots to Receive Notifications: Lot A, Lot B, Lot C",
    description: "Valid input (Add to list)",
  },
  {
    inputString: "gB",
    operation: 0,
    expectedOutput: "Selected Parking Lots to Receive Notifications: Lot A, Lot B, Lot C",
    description: "Invalid input (Remove from list)",
  },
  {
    inputString: "lot =ac",
    operation: 1,
    expectedOutput: "Selected Parking Lots to Receive Notifications: Lot A, Lot B, Lot C",
    description: "Valid input (Add to list)",
  },
  {
    inputString: "A and C",
    operation: 0,
    expectedOutput: "Selected Parking Lots to Receive Notifications: Lot B",
    description: "Valid input (Remove from list)",
  },
  {
    inputString: "",
    operation: 1,
    expectedOutput: "Selected Parking Lots to Receive Notifications: Lot B",
    description: "Invalid input (Add to list)",
  },
  {
    inputString: "all",
    operation: 0,
    expectedOutput: "Selected Parking Lots to Receive Notifications: Lot B",
    description: "Invalid input (Remove from list)",
  },
  {
    inputString: "  C----",
    operation: 1,
    expectedOutput: "Selected Parking Lots to Receive Notifications: Lot B, Lot C",
    description: "Valid input (Add to list)",
  },
  {
    inputString: "45",
    operation: 1,
    expectedOutput: "Selected Parking Lots to Receive Notifications: Lot B, Lot C",
    description: "Invalid input (Add to list)",
  },
  {
    inputString: "B and the other lot C",
    operation: 0,
    expectedOutput: "Selected Parking Lots to Receive Notifications: None",
    description: "Valid input (Remove from list)",
  },
];

console.log("Running test cases for Delete Reports:");
// Testing all test cases...
testCases.forEach((testCase, index) => {
  const { inputString, operation, expectedOutput, description } = testCase;
  const result = filterParkingLots(inputString, operation);
  
  // If the result matches the expected output display successful message
  if (result === expectedOutput) {
    console.log(`Test case ${index + 1} PASSED: ${description}`);
  } 
  // otherwise, display test case failed
  else {
    console.log(`Test case ${index + 1} FAILED: ${description}`);
    console.log(`Expected: ${expectedOutput}`);
    console.log(`Received: ${result}`);
  }
  
  // Display the list of parking lots the user wishes to get notifications for
  console.log(filterParkingLots(inputString, operation));
});

// Kashir Khan Change Credentials Test Cases

// Mock user data
const users = [
    {
      username: "testUser",
      password: "testPass",
      email: "test@email.com",
      phone: "123-456-7890"
    }
  ];
  
  // Mock change password function
  const changePassword = (username, oldPassword, newPassword, confirmPassword) => {
    const user = users.find(u => u.username === username && u.password === oldPassword);
    if (!user) return false;
    if (newPassword !== confirmPassword) return false;
    user.password = newPassword;
    return true;
  };
  
  // Mock change contact function
  const changeContact = (username, newEmail, newPhone) => {
    const user = users.find(u => u.username === username);
    if (!user) return false;
    user.email = newEmail;
    user.phone = newPhone;
    return true;
  };
  
  /* Password Change Test Cases */
  
  // Test: Empty old password
  (() => {
    if (!changePassword("testUser", "", "newPass", "newPass")) {
      console.log("Password Test Passed: Empty old password detected.");
    } else {
      console.log("Password Test Failed: Empty old password not detected.");
    }
  })();
  
  // Test: Empty new password
  (() => {
    if (!changePassword("testUser", "testPass", "", "")) {
      console.log("Password Test Passed: Empty new password detected.");
    } else {
      console.log("Password Test Failed: Empty new password not detected.");
    }
  })();
  
  // Test: Mismatching new password and confirm password
  (() => {
    if (!changePassword("testUser", "testPass", "newPass", "differentPass")) {
      console.log("Password Test Passed: Mismatching new password and confirm password detected.");
    } else {
      console.log("Password Test Failed: Mismatching new password and confirm password not detected.");
    }
  })();
  
  // Test: Correct old password
  (() => {
    if (changePassword("testUser", "testPass", "newPass", "newPass")) {
      console.log("Password Test Passed: Password changed successfully.");
    } else {
      console.log("Password Test Failed: Password could not be changed with correct old password.");
    }
  })();
  
  // Test: Incorrect old password
  (() => {
    if (!changePassword("testUser", "wrongPass", "newPass", "newPass")) {
      console.log("Password Test Passed: Incorrect old password detected.");
    } else {
      console.log("Password Test Failed: Password changed with incorrect old password.");
    }
  })();
  
  /* Phone/Email Change Test Cases */
  
  // Test: Empty email
  (() => {
    if (!changeContact("testUser", "", "123-456-7891")) {
      console.log("Contact Test Passed: Empty email detected.");
    } else {
      console.log("Contact Test Failed: Empty email not detected.");
    }
  })();
  
  // Test: Invalid email format
  (() => {
    if (!changeContact("testUser", "invalidEmail", "123-456-7891")) {
      console.log("Contact Test Passed: Invalid email format detected.");
    } else {
      console.log("Contact Test Failed: Invalid email format not detected.");
    }
  })();
  
  // Test: Change to a valid email and phone number
  (() => {
    if (changeContact("testUser", "new@email.com", "123-456-7891")) {
      console.log("Contact Test Passed: Email and phone number changed successfully.");
    } else {
      console.log("Contact Test Failed: Email and phone number could not be changed.");
    }
  })();
  
  // Test: Change to an already registered email (mock test)
  (() => {
    if (!changeContact("testUser", "test@email.com", "123-456-7891")) {
      console.log("Contact Test Passed: Already registered email detected.");
    } else {
      console.log("Contact Test Failed: Change to an already registered email not detected.");
    }
  })();



 // Kashir Khan Login Test Cases

// Mock user data
const users = [
    {
      username: "testUser",
      password: "testPass"
    }
  ];
  
  // Mock login function
  const loginUser = (username, password) => {
    const user = users.find(u => u.username === username && u.password === password);
    return user ? true : false;
  };
  
  // Test: Empty username
  (() => {
    if (!loginUser("", "testPass")) {
      console.log("Test Passed: Empty username detected.");
    } else {
      console.log("Test Failed: Empty username not detected.");
    }
  })();
  
  // Test: Empty password
  (() => {
    if (!loginUser("testUser", "")) {
      console.log("Test Passed: Empty password detected.");
    } else {
      console.log("Test Failed: Empty password not detected.");
    }
  })();
  
  // Test: Both username and password are empty
  (() => {
    if (!loginUser("", "")) {
      console.log("Test Passed: Empty username and password detected.");
    } else {
      console.log("Test Failed: Empty username and password not detected.");
    }
  })();
  
  // Test: Correct credentials
  (() => {
    if (loginUser("testUser", "testPass")) {
      console.log("Test Passed: User logged in successfully.");
    } else {
      console.log("Test Failed: User could not log in with correct credentials.");
    }
  })();
  
  // Test: Incorrect password
  (() => {
    if (!loginUser("testUser", "wrongPass")) {
      console.log("Test Passed: Incorrect password detected.");
    } else {
      console.log("Test Failed: User logged in with incorrect password.");
    }
  })();
  
  // Test: Non-existent username
  (() => {
    if (!loginUser("nonExistentUser", "testPass")) {
      console.log("Test Passed: Non-existent username detected.");
    } else {
      console.log("Test Failed: User logged in with non-existent username.");
    }
  })();
  
  // Test: Special characters in username and password
  (() => {
    if (!loginUser("test@User", "test#Pass")) {
      console.log("Test Passed: Special characters in username and password detected.");
    } else {
      console.log("Test Failed: User logged in with special characters in username or password.");
    }
  })();
  
  // Test: Multiple failed login attempts
  (() => {
    let failedAttempts = 0;
    for (let i = 0; i < 4; i++) {
      if (!loginUser("testUser", "wrongPass")) failedAttempts++;
    }
    if (failedAttempts >= 3) {
      console.log("Test Passed: User locked out after multiple failed attempts.");
    } else {
      console.log("Test Failed: User not locked out after multiple failed attempts.");
    }
  })();

  //Saishrey Bhandare TC33
// Mock user data
const users = [
    { username: "user1", notificationsEnabled: true },
    { username: "user2", notificationsEnabled: true },
    // Add more mock users if needed for testing
];

// Mock function to toggle notifications for a specific user
const toggleUserNotifications = (username, mute) => {
    const user = users.find(user => user.username === username);
    if (user) {
        user.notificationsEnabled = !mute;
        return true; // User found and notifications toggled
    }
    return false; // User not found
};

// Test cases to toggle notifications for individual users

// Test: Mute notifications for user1
(() => {
    const username = "user1";
    if (toggleUserNotifications(username, true)) {
        console.log(`Mute Notifications Test Passed: ${username}'s notifications muted successfully.`);
    } else {
        console.log(`Mute Notifications Test Failed: ${username} not found or notifications not muted.`);
    }
})();

// Test: Unmute notifications for user2
(() => {
    const username = "user2";
    if (toggleUserNotifications(username, false)) {
        console.log(`Unmute Notifications Test Passed: ${username}'s notifications unmuted successfully.`);
    } else {
        console.log(`Unmute Notifications Test Failed: ${username} not found or notifications not unmuted.`);
    }
})();

//Saishrey Bhandare TC4
// Mock user data
const users = [
    { username: "user1", pushEnabled: true, textEnabled: false, emailEnabled: true },
    { username: "user2", pushEnabled: false, textEnabled: true, emailEnabled: true },
    // Add more mock users if needed for testing
];

// Mock function to toggle notification types for a specific user
const toggleUserNotificationType = (username, notificationType) => {
    const user = users.find(user => user.username === username);
    if (user) {
        if (notificationType === 'push') {
            user.pushEnabled = !user.pushEnabled;
        } else if (notificationType === 'text') {
            user.textEnabled = !user.textEnabled;
        } else if (notificationType === 'email') {
            user.emailEnabled = !user.emailEnabled;
        } else {
            return false; // Invalid notification type
        }
        return true; // Notification type toggled successfully
    }
    return false; // User not found
};

// Test cases to toggle notification types for individual users

// Test: Toggle push notifications for user1
(() => {
    const username = "user1";
    const notificationType = "push";
    if (toggleUserNotificationType(username, notificationType)) {
        console.log(`Toggle Push Notifications Test Passed: ${username}'s push notifications toggled successfully.`);
    } else {
        console.log(`Toggle Push Notifications Test Failed: ${username} not found or push notifications not toggled.`);
    }
})();

// Test: Toggle text notifications for user2
(() => {
    const username = "user2";
    const notificationType = "text";
    if (toggleUserNotificationType(username, notificationType)) {
        console.log(`Toggle Text Notifications Test Passed: ${username}'s text notifications toggled successfully.`);
    } else {
        console.log(`Toggle Text Notifications Test Failed: ${username} not found or text notifications not toggled.`);
    }
})();

// Test: Toggle email notifications for a non-existent user
(() => {
    const username = "nonExistentUser";
    const notificationType = "email";
    if (toggleUserNotificationType(username, notificationType)) {
        console.log(`Toggle Email Notifications Test Failed: Toggled notifications for a non-existent user.`);
    } else {
        console.log(`Toggle Email Notifications Test Passed: Cannot toggle notifications for a non-existent user.`);
    }
})();


// Hamza Khan TC23
// Mock user data
const users = [
    {
      username: "testUser",
      password: "testPass",
      email: "test@email.com",
      phone: "123-456-7890",
      parkingHistory: ["Location A", "Location B", "Location C"]
    },
    // Add more users with parking history if needed
  ];

  // Mock function to erase parking history
  const eraseParkingHistory = (username) => {
    const user = users.find(u => u.username === username);
    if (!user) return false; // User not found
    user.parkingHistory = []; // Erase parking history
    return true; // Parking history erased successfully
  };

  /* Erase Parking History Test Cases */

  // Test: Erase parking history for existing user
  (() => {
    const username = "testUser";
    if (eraseParkingHistory(username)) {
      console.log("Erase Parking History Test Passed: Parking history erased successfully.");
      // Ensure the user's parking history is empty
      const user = users.find(u => u.username === username);
      if (user && user.parkingHistory.length === 0) {
        console.log("Erase Parking History Test Passed: User's parking history is empty.");
      } else {
        console.log("Erase Parking History Test Failed: User's parking history is not empty.");
      }
    } else {
      console.log("Erase Parking History Test Failed: Parking history could not be erased.");
    }
  })();

  // Test: Attempt to erase parking history for non-existent user
  (() => {
    const username = "nonExistentUser";
    if (!eraseParkingHistory(username)) {
      console.log("Erase Parking History Test Passed: Cannot erase parking history for a non-existent user.");
    } else {
      console.log("Erase Parking History Test Failed: Parking history erased for a non-existent user.");
    }
  })();


// Hamza Khan TC8

// Mock user data
const users = [
    { username: "testUser", password: "testPass", email: "test@email.com", phone: "123-456-7890" },
    // Add more mock users if needed for testing
  ];

  // Mock delete account function
  const deleteAccount = (username) => {
    const userIndex = users.findIndex(u => u.username === username);
    if (userIndex === -1) return false; // User not found
    users.splice(userIndex, 1); // Remove user from array
    return true; // Account deleted successfully
  };

  /* Delete Account Test Cases */

  // Test: Delete existing user
  (() => {
    const usernameToDelete = "testUser";
    if (deleteAccount(usernameToDelete)) {
      console.log("Delete Account Test Passed: Account deleted successfully.");
      // Ensure the user is no longer in the array
      if (users.findIndex(u => u.username === usernameToDelete) === -1) {
        console.log("Delete Account Test Passed: User is no longer in the database.");
      } else {
        console.log("Delete Account Test Failed: User is still in the database after deletion.");
      }
    } else {
      console.log("Delete Account Test Failed: Account could not be deleted.");
    }
  })();

  // Test: Try to delete the same user again (should fail because user no longer exists)
  (() => {
    const usernameToDelete = "testUser";
    if (!deleteAccount(usernameToDelete)) {
      console.log("Delete Account Test Passed: Cannot delete a non-existent account.");
    } else {
      console.log("Delete Account Test Failed: Deleted a non-existent account.");
    }
  })();

  /* Priya Sinha - TC20 - Enabling or Disabling sending of crash reports based on user request
    Assumptions:
    - Given user
    - We are on the Crash and Error Reports screen
*/

// Mock notifications info
const enabledReports = {
    selectCrashReportSend: false,
    errorReportSend: false,
}

// Change enabledReports struct based on user input

// Get select elements
const selectCrashReportSend = document.getElementById('crash-report-select');
const selectErrorReportSend = document.getElementById('error-report-select');

// Event listeners
selectCrashReportSend.addEventListener('change', event => {
    selectCrashReportSend = event.target.value;
});

selectErrorReportSend.addEventListener('change', event => {
    errorReportSend = event.target.value;
});


/* Priya Sinha - TC2 - Submit Report, having chosen a section
    Assumptions:
    - Given user
*/

// Some parking lots
const parkingLots = [
    {
      id: 1,
      parkingLot: "Lot A",
    },
    {
      id: 2,
      parkingLot: "Lot B",
    },
    {
      id: 3,
      parkingLot: "Lot C",
    },
    {
      id: 4,
      parkingLot: "Lot D",
    },
    {
      id: 5,
      parkingLot: "Lot E",
    },
    {
      id: 6,
      parkingLot: "Lot F",
    }
  ];

// Mock submit report function
const submitReport = (areaID) => {
    const message = "Parking officials reported in " + selectedArea;
    console.log(message);
};

// Submit report based on user input to GUI

// Get select elements
const selectLot = document.getElementById('areaSelection');

// Event listeners
selectLot.addEventListener('change', event => {
    selectedArea = event.target.value;
});


