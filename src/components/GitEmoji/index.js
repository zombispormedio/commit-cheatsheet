import React, { useState, useMemo } from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";
import styled from "@emotion/styled";
import { toast } from "react-toastify";
import GitEmojiItem from "./GitEmojiItem";
import GitEmojiWrapper from "./GitEmojiWrapper";
import GitEmojiContent from "./GitEmojiContent";
import GitEmojiInput from "./GitEmojiInput";
import "./icons/index.css";
import "react-toastify/dist/ReactToastify.css";

const Divider = styled.hr`
  border: 1px solid #dadce0;
`;
const filterBySearch = (items, search) =>
  search === ""
    ? items
    : items.filter(item => {
        const regex = new RegExp(search, "gim");
        return regex.test(item.code) || regex.test(item.description);
      });

const updateSearchUrl = newSearch => {
  const newurl = `${window.location.protocol}//${window.location.host}${
    window.location.pathname
  }?s=${newSearch}`;
  window.history.pushState({ path: newurl }, "", newurl);
};

const getCachePinned = () => {
  if (typeof window === `undefined`) return [];
  const pinned = window.localStorage.getItem("pinned");
  return !pinned && pinned !== ""
    ? []
    : window.localStorage.getItem("pinned").split(",");
};

const GitEmoji = ({ active, items }) => {
  const [search, setSearch] = useState(() => {
    if (typeof window === `undefined`) return "";
    return new URL(window.location.href).searchParams.get("s") || "";
  });
  const [pinned, setPinned] = useState(() => getCachePinned());

  const { pinnedItems, filteredItems } = useMemo(() => {
    const p = items.filter(item => pinned.includes(item.code));
    const f = filterBySearch(
      items.filter(item => !pinned.includes(item.code)),
      search
    );
    return {
      pinnedItems: p,
      filteredItems: f
    };
  }, [items, pinned, search]);

  const onChange = (({ target: { value: newSearch } }) => {
    setSearch(newSearch);
    updateSearchUrl(newSearch);
  },
  []);

  const onPin = code =>
    setPinned(prev => {
      const newPinned = [...prev, code];
      localStorage.setItem("pinned", newPinned.join(","));
      return newPinned;
    });

  const onUnpin = code =>
    setPinned(prev => {
      const index = prev.findIndex(item => item === code);
      const newPinned = [...prev];
      newPinned.splice(index, 1);
      localStorage.setItem("pinned", newPinned.join(","));
      return newPinned;
    });

  return (
    <GitEmojiWrapper active={active}>
      <GitEmojiInput
        type="text"
        value={search}
        onChange={onChange}
        placeholder="Search emoji"
        aria-label="Search emoji"
      />
      {pinnedItems.length > 0 && (
        <>
          <GitEmojiContent>
            {pinnedItems.map(item => (
              <GitEmojiItem
                key={item.code}
                {...item}
                onCopy={code => toast(`Copied ${code}`)}
                pinned
                onPin={onUnpin}
              />
            ))}
          </GitEmojiContent>
          <Divider />
        </>
      )}
      <GitEmojiContent>
        {filteredItems.map(item => (
          <GitEmojiItem
            key={item.code}
            {...item}
            onCopy={code => toast(`Copied ${code}`)}
            pinned={false}
            onPin={onPin}
          />
        ))}
      </GitEmojiContent>
    </GitEmojiWrapper>
  );
};

GitEmoji.defaultProps = {
  items: [],
  active: false
};

GitEmoji.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      emoji: PropTypes.string,
      code: PropTypes.string,
      description: PropTypes.string,
      name: PropTypes.string
    })
  ),
  active: PropTypes.bool
};

export default GitEmoji;

export const query = graphql`
  fragment GitEmoji on ContentJson {
    gitemoji {
      items {
        name
        emoji
        code
        description
      }
    }
  }
`;
