import { gql } from '@apollo/client';

export const getAllNews = gql`
  query {
    getAllNews {
      items {
        _id
        translationsKey
        title {
          value
        }
        slug
        author {
          name {
            value
          }
          image
        }
        text {
          value
        }
        date
        image
      }
    }
  }
`;

export const getNewsById = gql`
  query ($id: ID!) {
    getNewsById(id: $id) {
      __typename
      ... on News {
        _id
        title {
          value
        }
        translationsKey
        text {
          value
        }
        image
        author {
          name {
            value
          }
          image
        }
        date
      }
      ... on Error {
        message
        statusCode
      }
    }
  }
`;
