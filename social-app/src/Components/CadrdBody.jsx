import React from "react";
import { CardBody as HeroBody, Image } from "@heroui/react";

export default function CardBodySection({ body, image }) {
  return (
    <HeroBody className="px-5 py-3 text-small text-default-600">
      {body && <p className="text-xl ">{body}</p>}

      {image && (
        <Image
          width="100%"
          alt="HeroUI Album Cover"
          className="rounded-lg py-3 h-80 object-cover"
          src={image}
        />
      )}
    </HeroBody>
  );
}
