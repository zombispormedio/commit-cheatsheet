import React, { Component } from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";
import { CopyToClipboard } from "react-copy-to-clipboard";
import {
  SiteHead,
  Cheatsheet,
  GitEmoji,
  GitEmojiInput,
  GitEmojiItem,
  Emoji,
  EmojiDescription,
  ScopeList
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
          <GitEmojiInput
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
                  <EmojiDescription>
                    <div>{code}</div>
                    <div>{description}</div>
                  </EmojiDescription>
                </GitEmojiItem>
              </CopyToClipboard>
            ))}
        </GitEmoji>
        <ScopeList>
          {convention.items.map(({ title, description }) => (
            <li key={title}>
              <CopyToClipboard
                text={title}
                onCopy={() => console.log(`Copied ${title}`)}
              >
                <strong>{title}</strong>
              </CopyToClipboard>
              : {description}
            </li>
          ))}
        </ScopeList>
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
