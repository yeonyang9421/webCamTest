import React, { useState, useEffect, ChangeEvent } from "react";

interface ToggleCamProps {
  onSelectDevice: (deviceId: string) => void;
}

interface MediaDeviceInfo {
  deviceId: string;
  kind: string;
  label: string;
  groupId: string;
}

const ToggleCam: React.FC<ToggleCamProps> = ({ onSelectDevice }) => {
  const [devices, setDevices] = useState<MediaDeviceInfo[]>([]);

  useEffect(() => {
    navigator.mediaDevices.enumerateDevices().then((d) => {
      setDevices(d.filter(({ kind }) => kind === "videoinput"));
    });
  }, []);

  const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
    onSelectDevice(event.target.value);
  };

  console.log(devices);

  return (
    <select onChange={handleSelectChange}>
      {devices.map(({ label, deviceId }) => (
        <option key={deviceId} value={deviceId}>
          {label || `Camera ${deviceId}`}
        </option>
      ))}
    </select>
  );
};

export default ToggleCam;
