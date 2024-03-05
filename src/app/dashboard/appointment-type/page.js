"use client";
import Button from "../../../../components/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faShareNodes,
  faEllipsisVertical,
} from "@fortawesome/free-solid-svg-icons";
import React from "react";
import { useAuthContext } from "../../../../context/AuthContext";
import { useRouter } from "next/navigation";
import getData from "../../../../firebase/firestore/getData";
import "./appCard.css";

export default function Page() {
  const { user } = useAuthContext();
  const [collectionData, setCollectionData] = React.useState([]);
  const router = useRouter();

  React.useEffect(() => {
    if (user == null) router.push("/login");
  }, [user]);

  React.useEffect(() => {
    const fetchCollectionData = async () => {
      const data = await getData("appointment types");
      setCollectionData(data);
    };

    fetchCollectionData();
  }, []);

  return (
    <div>
      <Button
        icon={faPlus}
        className="app-type-button"
        onClick={() => router.push("/new-appointment-type")}
      >
        new appointment
      </Button>
      <div className="app-cards">
        <ul>
          {collectionData.map((item) => (
            <li key={item.id} className="app-cardbox">
              <h2 className="meetingName">
                {item.meetingName}
                <FontAwesomeIcon
                  icon={faEllipsisVertical}
                  className="ellipsis"
                />
              </h2>
              <p className="dur-loc">
                {item.duration},{item.location}
              </p>
              <p>{item.days}</p>
              <FontAwesomeIcon icon={faShareNodes} className="shareNodes" />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
