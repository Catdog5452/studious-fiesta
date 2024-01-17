import { useState } from "react";

function Settings() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [notifications, setNotifications] = useState(false);

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleNotificationsChange = (event) => {
    setNotifications(event.target.checked);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(
      `Name: ${name}, Email: ${email}, Notifications: ${notifications}`
    );
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input type="text" value={name} onChange={handleNameChange} />
      </label>
      <br />
      <label>
        Email:
        <input type="email" value={email} onChange={handleEmailChange} />
      </label>
      <br />
      <label>
        Notifications:
        <input
          type="checkbox"
          checked={notifications}
          onChange={handleNotificationsChange}
        />
      </label>
      <br />
      <button type="submit">Save</button>
    </form>
  );
}

export default Settings;
