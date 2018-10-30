import React, { Component } from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";
import { CopyToClipboard } from "react-copy-to-clipboard";
import {
  SiteHead,
  Cheatsheet,
  GitEmoji,
  GitEmojiItem,
  Emoji
} from "../components";

class CommitCheatsheetPage extends Component {
  state = {
    search: ""
  };

  onChange = ({ target: { value: search } }) => {
    this.setState({
      search
    });
  };

  render() {
    const {
      data: {
        allContentJson: {
          edges: [
            {
              node: { gitemoji, convention }
            }
          ]
        }
      }
    } = this.props;
    const { search } = this.state;
    return (
      <Cheatsheet>
        <SiteHead />
        <GitEmoji>
          <input
            css="position: fixed; bottom: 0.5rem; width: 50%;"
            type="text"
            value={search}
            onChange={this.onChange}
            placeholder="search emoji"
          />
          {gitemoji.items
            .filter(item => {
              if (search === "") return true;
              const regex = new RegExp(search, "gim");
              return regex.test(item.code) || regex.test(item.description);
            })
            .map(({ emoji, code, description, name }) => (
              <CopyToClipboard
                key={emoji}
                text={code}
                onCopy={() => console.log(`Copied ${code}`)}
              >
                <GitEmojiItem>
                  <Emoji className={name}>
                    <span>{emoji}</span>
                  </Emoji>
                  <div css="padding: 0.5rem;">
                    <div>{code}</div>
                    <div>{description}</div>
                  </div>
                </GitEmojiItem>
              </CopyToClipboard>
            ))}
        </GitEmoji>
        <ul>
          {convention.items.map(({ title, description }) => (
            <li key={title}>
              <CopyToClipboard
                text={title}
                onCopy={() => console.log(`Copied ${title}`)}
              >
                <strong css="cursor: pointer;">{title}</strong>
              </CopyToClipboard>
              : {description}
            </li>
          ))}
        </ul>
      </Cheatsheet>
    );
  }
}

CommitCheatsheetPage.propTypes = {
  data: PropTypes.shape({
    allContentJson: PropTypes.shape({
      edges: PropTypes.array
    })
  }).isRequired
};

export default CommitCheatsheetPage;

export const query = graphql`
  query {
    allContentJson {
      edges {
        node {
          gitemoji {
            items {
              name
              emoji
              code
              description
            }
          }
          convention {
            items {
              title
              description
            }
          }
        }
      }
    }
  }
`;
