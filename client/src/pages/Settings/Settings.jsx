import React, { useState } from "react";
import "./Settings.css";
import Sidebar from "../../components/Sidebar/Sidebar";
import Switch from "react-switch";
import MobileNavbar from "../../components/MobileNavbar/MobileNavbar";

const Settings = () => {
  const [sidebarView, setSidebarView] = useState(false);
  const [checked, setChecked] = useState(false);
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
        </div>
      </div>
    </div>
  );
};

export default Settings;
