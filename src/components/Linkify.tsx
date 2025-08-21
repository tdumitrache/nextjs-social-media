import Link from "next/link";
import React from "react";
import { LinkIt, LinkItUrl } from "react-linkify-it";
import UserLinkWithTooltip from "./UserLinkWithTooltip";

interface LinkifyProps {
  children: React.ReactNode;
}

const LinkifyUrl = ({ children }: LinkifyProps) => {
  return (
    <LinkItUrl className="text-primary hover:underline">{children}</LinkItUrl>
  );
};

const LinkifyUsername = ({ children }: LinkifyProps) => {
  return (
    <LinkIt
      regex={/(@[a-zA-Z0-9_-]+)/}
      component={(match, key) => (
        <UserLinkWithTooltip key={key} username={match.slice(1)}>
          {match}
        </UserLinkWithTooltip>
      )}
    >
      {children}
    </LinkIt>
  );
};

const LinkifyHashtag = ({ children }: LinkifyProps) => {
  return (
    <LinkIt
      component={(match, key) => {
        const hashtag = match.slice(1);

        return (
          <Link
            href={`/hashtags/${hashtag}`}
            className="text-primary hover:underline"
            key={key}
          >
            {match}
          </Link>
        );
      }}
      regex={/#[a-zA-Z0-9_]+/}
    >
      {children}
    </LinkIt>
  );
};

const Linkify = ({ children }: LinkifyProps) => {
  return (
    <LinkifyUsername>
      <LinkifyHashtag>
        <LinkifyUrl>{children}</LinkifyUrl>
      </LinkifyHashtag>
    </LinkifyUsername>
  );
};

export default Linkify;
