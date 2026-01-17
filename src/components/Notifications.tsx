import React, { useState } from "react";
import styled from "styled-components";
import radiusIcon from "./radius.png";
import {
  NotificationsBackgroundColor,
  BorderColor,
  TextColor,
  FilterSliderColor,
  FilterThumbColor,
  ErrorMessageColor,
} from "./Constants";

const NotificationsWrapperContainer = styled.div`
  max-width: 300px;
  width: 90%;
  position: absolute;
  margin-top: 320px;
  z-index: 10;
`;

const NotificationsContainer = styled.div`
  background: ${NotificationsBackgroundColor};
  border: 1px solid ${BorderColor};
  padding: 10px 20px 10px 20px;
`;

const NotiForm = styled.form`
  padding: 12px 0 5px 0;
  border: none;
  width: 100%;
  float: left;

  &:not(:nth-last-child(3)) {
    border-bottom: 1px solid ${BorderColor};
  }
`;

const NotiLabel = styled.label`
  font-weight: bold;
  display: block;
  text-align: left;
  font-size: 0.95em;
  margin-bottom: 2px;
`;

const NotiInput = styled.input`
  border: none;
  background-color: rgba(255, 255, 255, 0);
  font-family: inherit;
  font-weight: 200;
  font-size: 16px;
  width: 100%;
  height: 20px;
  color: ${TextColor};

  &:focus {
    outline: none;
  }
`;

const RangeSlider = styled.input`
  float: left;
  cursor: pointer;
  appearance: none;
  width: 120px;
  height: 3px;
  background: ${FilterSliderColor};
  outline: none;
  -webkit-transition: 0.2s;
  transition: opacity 0.2s;
  border-radius: 2px;
  margin: 10px;

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 15px;
    height: 15px;
    border-radius: 50%;
    border: 1px solid ${BorderColor};
    background: ${FilterThumbColor};
    cursor: pointer;
  }

  &::-moz-range-thumb {
    width: 15px;
    height: 15px;
    border-radius: 50%;
    border: 1px solid ${BorderColor};
    background: ${FilterThumbColor};
    cursor: pointer;
  }
`;

const RangeSliderValue = styled.span`
  width: 60px;
  margin-left: 5px;
`;

const NotiErrorMessage = styled.div`
  padding: 20px 0 0 0;
  border: none;
  width: 100%;
  float: left;
  font-family: inherit;
  font-weight: 500;
  color: ${ErrorMessageColor};
  height: 20px;
`;

const NotiSuccess = styled.div`
  padding: 40px 0 10px 0;
  width: 100%;
`;

const CloseNotiContainer = styled.div`
  float: right;

  button {
    background-color: rgba(255, 255, 255, 0);
    border: none;
    font-family: inherit;
    font-size: 16px;

    &:hover {
      cursor: pointer;
    }
  }
`;

const NotiButtonContainer = styled.div`
  padding-right: 12px;
`;

const NotiButton = styled.button`
  margin: 10px;
  background-color: rgba(255, 255, 255, 0);
  border: 1px solid ${BorderColor};
  padding: 10px;
  font-family: inherit;

  &:hover:enabled {
    cursor: pointer;
    background-color: rgba(255, 255, 255, 0.3);
    -webkit-transition: 0.2s;
    transition: opacity 0.2s;
  }

  &:disabled {
    background-color: #eee;
    color: #aaa;
    border: 1px solid #ccc;
    cursor: not-allowed;
    opacity: 0.7;
  }
`;

interface Props {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  title: string;
  city: string;
  radius: number;
  baseUrl: string;
}

const Notifications = ({
  isOpen,
  setIsOpen,
  title,
  city,
  radius,
  baseUrl,
}: Props) => {
  const [titleNotification, setTitleNotification] = useState(title);
  const [cityNotification, setCityNotification] = useState(city);
  const [radiusNotification, setRadiusNotification] = useState(radius);
  const [emailNotification, setEmailNotification] = useState("");
  const [subSucc, setSubSucc] = useState(false);
  const [errMsg, setErrMsg] = useState("");

  const resetNotiForm = () => {
    setIsOpen(false);
    setSubSucc(false);
    setErrMsg("");
    setTitleNotification(title);
    setCityNotification(city);
    setRadiusNotification(radius);
  };

  const handleNotiSubmit = (
    title: string,
    city: string,
    radius: number,
    email: string,
  ) => {
    console.log(title, city, radius, email);
    const controller = new AbortController();
    (async () => {
      var url =
        baseUrl +
        "/add" +
        "?title=" +
        titleNotification +
        "&city=" +
        cityNotification +
        "&radius=" +
        radiusNotification +
        "&email=" +
        emailNotification;

      try {
        const res = await fetch(url, { signal: controller.signal });
        if (!controller.signal.aborted) {
          const res_json = await res.json();
          console.log(res_json);
          if (res.ok) {
            setSubSucc(true);
          } else {
            setErrMsg(res_json["message"]);
          }
        }
      } catch (error) {
        // ignore
      }
    })();
  };

  const isSubmitButtonDisabled =
    !titleNotification || !cityNotification || !emailNotification;

  return (
    <NotificationsWrapperContainer>
      {isOpen && (
        <NotificationsContainer>
          <CloseNotiContainer>
            <button
              onClick={function (_event) {
                resetNotiForm();
              }}
            >
              x
            </button>
          </CloseNotiContainer>
          {!subSucc && (
            <div>
              <NotiForm>
                <NotiLabel htmlFor="titlenotification">
                  Title <span style={{ color: "red" }}>*</span>
                </NotiLabel>
                <NotiInput
                  autoComplete="off"
                  id="titlenotification"
                  type="text"
                  defaultValue={titleNotification}
                  onChange={function (
                    event: React.ChangeEvent<HTMLInputElement>,
                  ) {
                    setTitleNotification(event.currentTarget.value);
                  }}
                />
              </NotiForm>
              <NotiForm>
                <NotiLabel htmlFor="citynotification">
                  City <span style={{ color: "red" }}>*</span>
                </NotiLabel>
                <NotiInput
                  autoComplete="off"
                  id="citynotification"
                  type="text"
                  defaultValue={cityNotification}
                  onChange={function (
                    event: React.ChangeEvent<HTMLInputElement>,
                  ) {
                    setCityNotification(event.currentTarget.value);
                  }}
                />
              </NotiForm>
              <NotiForm>
                <NotiLabel htmlFor="emailnotification">
                  Email address <span style={{ color: "red" }}>*</span>
                </NotiLabel>
                <NotiInput
                  autoComplete="off"
                  id="emailnotification"
                  type="email"
                  onChange={function (
                    event: React.ChangeEvent<HTMLInputElement>,
                  ) {
                    setEmailNotification(event.currentTarget.value);
                  }}
                />
              </NotiForm>
              <NotiForm>
                <RangeSlider
                  type="range"
                  min={0}
                  max={200}
                  step={10}
                  value={radiusNotification}
                  onChange={function (
                    event: React.ChangeEvent<HTMLInputElement>,
                  ) {
                    setRadiusNotification(event.currentTarget.valueAsNumber);
                  }}
                />
                <RangeSliderValue>{radiusNotification} km</RangeSliderValue>
                <img
                  src={radiusIcon}
                  width="22"
                  height="22"
                  alt="radius icon"
                />
              </NotiForm>
              <NotiErrorMessage>{errMsg}</NotiErrorMessage>
              <NotiButtonContainer>
                <NotiButton
                  type="submit"
                  disabled={isSubmitButtonDisabled}
                  onClick={function (
                    _event: React.MouseEvent<HTMLButtonElement>,
                  ) {
                    handleNotiSubmit(
                      titleNotification,
                      cityNotification,
                      radiusNotification,
                      emailNotification,
                    );
                  }}
                >
                  Subscribe
                </NotiButton>
              </NotiButtonContainer>
            </div>
          )}

          {subSucc && (
            <NotiSuccess>Success! Please check your e-mails.</NotiSuccess>
          )}
        </NotificationsContainer>
      )}
    </NotificationsWrapperContainer>
  );
};

export default Notifications;
