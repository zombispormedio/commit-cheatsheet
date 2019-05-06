import React, { useState, useCallback } from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";
import styled from "@emotion/styled";
import { ToastContainer, toast } from "react-toastify";
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
  const pinned = localStorage.getItem("pinned");
  return !pinned && pinned !== ""
    ? []
    : localStorage.getItem("pinned").split(",");
};

const GitEmoji = ({ active, items }) => {
  const [search, setSearch] = useState(
    () => new URL(window.location.href).searchParams.get("s") || ""
  );
  const [filteredItems, setFilteredItems] = useState(() => {
    const cachePinned = getCachePinned();
    return filterBySearch(
      items.filter(item => !cachePinned.includes(item.code)),
      search
    );
  });
  const [pinnedItems, setPinnedItems] = useState(() => {
    const cachePinned = getCachePinned();
    return items.filter(item => cachePinned.includes(item.code));
  });

  const onChange = useCallback(
    ({ target: { value: newSearch } }) => {
      setSearch(newSearch);
      const pinnedCodes = pinnedItems.map(({ code }) => code);
      setFilteredItems(
        filterBySearch(
          items.filter(item => !pinnedCodes.includes(item.code)),
          newSearch
        )
      );
      updateSearchUrl(newSearch);
    },
    [items, pinnedItems]
  );

  const onPin = useCallback(
    code => {
      const elem = items.find(item => item.code === code);
      setPinnedItems(prev => [...prev, elem]);
      setFilteredItems(prev => prev.filter(item => item.code !== code));
      const cachePinned = getCachePinned();
      cachePinned.push(code);
      localStorage.setItem("pinned", cachePinned.join(","));
    },
    [items]
  );

  const onUnpin = useCallback(
    code => {
      const index = pinnedItems.findIndex(item => item.code === code);
      const newPinnedItems = [...pinnedItems];
      newPinnedItems.splice(index, 1);
      setPinnedItems(newPinnedItems);
      const pinnedCodes = newPinnedItems.map(item => item.code);
      setFilteredItems(
        filterBySearch(
          items.filter(item => !pinnedCodes.includes(item.code)),
          search
        )
      );
      const cachePinned = getCachePinned();
      const cacheIndex = cachePinned.findIndex(item => item.code === code);
      cachePinned.splice(cacheIndex, 1);
      localStorage.setItem("pinned", cachePinned.join(","));
    },
    [items, search, pinnedItems]
  );

  return (
    <>
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
      <ToastContainer />
    </>
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
