import React from "react";

interface Props {
  isOpen: boolean;
  title: string;
  city: string;
  radius: number;
}

const Notifications = ({ isOpen, title, city, radius }: Props) => {
  return (
    <div className="notifications-wrapper__container">
      {isOpen && (
        <div className="notifications__container">
          <form className="input">
            <input
              id="titlenotification"
              type="input"
              placeholder="Title"
              className="noti_box_title"
            />
          </form>
        </div>
      )}
    </div>
  );
};

export default Notifications;
