import React, { useState } from "react";
import "./Settings.css";
import Sidebar from "../../components/Sidebar/Sidebar";
import Switch from "react-switch";
import MobileNavbar from "../../components/MobileNavbar/MobileNavbar";
import { useMutation } from "@apollo/client";
import { DELETE_ACCOUNT, DELETE_CONTENT } from "../../utils/graphql/mutations";

const Settings = () => {
  const [sidebarView, setSidebarView] = useState(false);
  const [checked, setChecked] = useState(false);
  const [deleteAccount] = useMutation(DELETE_ACCOUNT);
  const [deleteContent] = useMutation(DELETE_CONTENT);

  const deleteAccountHandler = async (e) => {
    e.preventDefault();
    const confirmed = window.confirm(
      "Are you sure you want to delete your account?"
    );
    if (confirmed) {
      const password = prompt("Enter your password to confirm");
      // console.log(password);
      await deleteAccount({
        variables: {
          email: localStorage.getItem("email"),
          password: password
        }
      }).then((res) => {
        // console.log(res);
        if (res?.data.deleteAccount.success) {
          alert("Account deleted");
          localStorage.removeItem("email");
          localStorage.removeItem("token");
          window.location.href = "/";
        } else {
          alert(res?.data.deleteAccount.message);
        }
      });
    } else {
      alert("Account not deleted");
    }
  };

  const deleteContentHandler = async (e) => {
    e.preventDefault();
    const confirmed = window.confirm(
      "Are you sure you want to delete your content?"
    );
    if (confirmed) {
      const password = prompt("Enter your password to confirm");
      await deleteContent({
        variables: {
          email: localStorage.getItem("email"),
          password: password
        }
      }).then((res) => {
        // console.log(res);
        if (res?.data.deleteContent.success) {
          alert("Content deleted");
        } else {
          alert(res?.data.deleteContent.message);
        }
      });
    } else {
      alert("Content not deleted");
    }
  };
  return (
    <div className="settings flex">
      <Sidebar sidebarView={sidebarView} />
      <div className="settings-container sm:mt-5">
        <MobileNavbar
          sidebarView={sidebarView}
          setSidebarView={setSidebarView}
        />
        <div className="" onClick={() => setSidebarView(false)}>
          <nav>
            <h2 className="text-white">Settings</h2>
          </nav>
          <div className="setting-table mt-10">
            <div className="setting-head p-5">
              <h3 className="text-white text-lg font-medium">
                General Settings
              </h3>
            </div>
            <div className="setting-items">
              <ul>
                <li className="p-5 flex justify-between">
                  <p> Dark Mode</p>
                  <Switch
                    onChange={() => setChecked(!checked)}
                    checked={checked}
                    uncheckedIcon={false}
                    checkedIcon={false}
                    onColor="#f5a504"
                    height={20}
                    width={40}
                  />
                </li>
                <li className="p-5 flex justify-between">Auto save</li>
                <li className="p-5">Enable page viewer</li>
                <li className="p-5">Nutrient tracker</li>
                <li className="p-5">Auto post</li>
              </ul>
            </div>
          </div>
          <div className="delete-account-button my-5 flex sm:flex-row flex-col gap-5">
            <button onClick={deleteContentHandler}>Remove content</button>
            <button onClick={deleteAccountHandler}>Delete account</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
