import React from 'react';
import styled from 'react-emotion';
import { ApolloConsumer } from 'react-apollo';

import { menuItemClassName } from '../components/menu-item';
import { ReactComponent as ExitIcon } from '../assets/icons/exit.svg';

export default function LogoutButton() {
  return (
    <ApolloConsumer>
      {client => (
        <StyledButton
          onClick={() => {
            // Direct writes are typically used to write simple booleans or strings to the cache whereas client resolvers are for more complicated writes such as adding or removing data from a list.
            client.writeData({ data: { isLoggedIn: false } });
            localStorage.clear();
          }}
        >
          <ExitIcon />
          Logout
        </StyledButton>
      )}
    </ApolloConsumer>
  );
}

const StyledButton = styled('button')(menuItemClassName, {
  background: 'none',
  border: 'none',
  padding: 0,
  cursor: 'pointer',   // Don't know why the button didn't have this by default
});
