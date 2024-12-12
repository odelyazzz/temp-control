import { useState } from "react";
import Button from "../Button/Button";
import "./TempController.css";

const TempController = () => {
  const [temp, setTemp] = useState(15);
  const [isDisable, setIsDisable] = useState(false);
  const [message, setMessage] = useState("");
  const [secure, setSecure] = useState(true);

  const handleClickIncreaseTempButton = () => {
    if (temp >= 30 && secure) {
      setMessage("Сработала защита от перегрева");
      setIsDisable(true);

      setTimeout(() => {
        setMessage("");
        setIsDisable(false);
      }, 3000);
      return;
    }

    setTemp((prev) => prev + 1);

    if (temp > 40) {
      setIsDisable(true);
      setMessage("Оборудование перегрелось");
    }
  };

  const handleClickDecreaseTempButton = () => {
    if (temp <= 5 && secure) {
      setMessage("Сработала защита от переохлаждения");
      setIsDisable(true);

      setTimeout(() => {
        setMessage("");
        setIsDisable(false);
      }, 3000);
      return;
    }

    setTemp((prev) => prev - 1);

    if (temp < -5) {
      setIsDisable(true);
      setMessage("Оборудование замерзло");
    }
  };

  const getBackgroundColor = () => {
    switch (true) {
      case temp <= 0:
        return "rgb(0, 0, 139)";
      case temp > 0 && temp <= 10:
        return "rgb(70, 130, 180)";
      case temp > 10 && temp <= 20:
        return "rgb(173, 216, 230)";
      case temp > 20 && temp <= 25:
        return "rgb(255, 165, 0)";
      case temp > 25 && temp <= 30:
        return "rgb(255, 69, 0)";
      case temp > 30:
        return "rgb(139, 0, 0)";
      default:
        return "rgb(255, 255, 255)";
    }
  };

  return (
    <div className="controller">
      <p
        className="controller-indicator"
        style={{ "--bg-color": getBackgroundColor() }}
      >
        {temp}°С
      </p>
      <div className="controller-protection">
        <input
          type="checkbox"
          checked={secure}
          onChange={() => setSecure(!secure)}
        />
        <p>Защита от температуры</p>
      </div>
      <div className="controller-buttons">
        <Button disabled={isDisable} onClick={handleClickIncreaseTempButton}>
          +
        </Button>
        <Button disabled={isDisable} onClick={handleClickDecreaseTempButton}>
          -
        </Button>
      </div>
      {message && <p className="controller-message">{message}</p>}
    </div>
  );
};

export default TempController;
