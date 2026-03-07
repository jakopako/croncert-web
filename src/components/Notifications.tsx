import React, { useState } from "react";
import styled from "styled-components";
import radiusIcon from "./radius.png";
import {
  NotificationsBackgroundColor,
  BorderColor,
  LightTextColor,
  FilterSliderColor,
  FilterThumbColor,
  ErrorMessageColor,
  SearchBarGlowShadow,
  SearchBarGlowBorderColor,
  PlaceholderTextColor,
  DarkBackgroundColor,
} from "./Constants";

const NotificationsWrapperContainer = styled.div`
  max-width: 300px;
  width: 90%;
  position: absolute;
  margin-top: 330px;
  z-index: 10;
`;

const NotificationsContainer = styled.div`
  background: ${NotificationsBackgroundColor};
  border: 1px solid ${BorderColor};
  border-radius: 15px;
  padding: 10px 20px 10px 20px;
  color: ${LightTextColor};

  box-shadow: ${SearchBarGlowShadow};
  border-color: ${SearchBarGlowBorderColor};
`;

const NotiForm = styled.form`
  padding: 12px 0 5px 0;
  border: none;
  width: 100%;
  float: left;
  display: flex;
  align-items: center;

  &:not(:nth-last-child(3)) {
    border-bottom: 1px solid ${SearchBarGlowBorderColor};
  }

  > img {
    margin-right: 2px;
  }
`;

const NotiInput = styled.input`
  border: none;
  background-color: rgba(255, 255, 255, 0);
  font-family: inherit;
  font-weight: 300;
  font-size: 16px;
  width: 100%;
  height: 20px;
  color: ${LightTextColor};

  &:focus {
    outline: none;
  }

  &::placeholder {
    color: ${PlaceholderTextColor};
    opacity: 0.5;
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
    border: 1px solid ${DarkBackgroundColor};
    background: ${FilterThumbColor};
    cursor: pointer;

    box-shadow: ${SearchBarGlowShadow};
    border-color: ${SearchBarGlowBorderColor};
  }

  &::-moz-range-thumb {
    width: 15px;
    height: 15px;
    border-radius: 50%;
    border: 1px solid ${DarkBackgroundColor};
    background: ${FilterThumbColor};
    cursor: pointer;

    box-shadow: ${SearchBarGlowShadow};
    border-color: ${SearchBarGlowBorderColor};
  }
`;

const RangeSliderValue = styled.span`
  width: 80px;
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
  border-radius: 15px;

  box-shadow: ${SearchBarGlowShadow};
  border-color: ${SearchBarGlowBorderColor};

  &:hover:enabled {
    cursor: pointer;
    background-color: rgba(255, 255, 255, 0.3);
    -webkit-transition: 0.2s;
    transition: opacity 0.2s;
  }

  &:disabled {
    background-color: #eee;
    color: #aaa;
    cursor: not-allowed;
    opacity: 0.5;
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
                <NotiInput
                  autoComplete="off"
                  id="titlenotification"
                  type="text"
                  placeholder="Title *"
                  onChange={function (
                    event: React.ChangeEvent<HTMLInputElement>,
                  ) {
                    setTitleNotification(event.currentTarget.value);
                  }}
                />
              </NotiForm>
              <NotiForm>
                <NotiInput
                  autoComplete="off"
                  id="citynotification"
                  type="text"
                  placeholder="City *"
                  onChange={function (
                    event: React.ChangeEvent<HTMLInputElement>,
                  ) {
                    setCityNotification(event.currentTarget.value);
                  }}
                />
              </NotiForm>
              <NotiForm>
                <NotiInput
                  autoComplete="off"
                  id="emailnotification"
                  type="email"
                  placeholder="Email address *"
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
