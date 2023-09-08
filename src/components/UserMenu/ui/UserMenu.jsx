import { useState } from 'react';
import {
  createStyles,
  UnstyledButton,
  Group,
  Text,
  Menu,
  rem,
} from '@mantine/core';
import { IconLogout, IconLogin, IconChevronDown } from '@tabler/icons-react';
import { useAuth } from '../../../context/AuthProvider';
import { useNavigate } from 'react-router-dom';

const useStyles = createStyles((theme) => ({
  user: {
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,
    padding: `${theme.spacing.xs} ${theme.spacing.sm}`,
    borderRadius: theme.radius.sm,
    transition: 'background-color 100ms ease',

    '&:hover': {
      backgroundColor:
        theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.white,
    },
  },
  userActive: {
    backgroundColor:
      theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.white,
  },
}));

function UserMenu() {
  const { classes, cx } = useStyles();
  const [userMenuOpened, setUserMenuOpened] = useState(false);

  const auth = useAuth();
  const navigate = useNavigate();

  const handleSignOut = () => {
    auth.signout(() => navigate('/'));
  };

  return (
    <Menu
      width={260}
      position="bottom-end"
      transitionProps={{ transition: 'pop-top-right' }}
      onClose={() => setUserMenuOpened(false)}
      onOpen={() => setUserMenuOpened(true)}
      withinPortal
    >
      <Menu.Target>
        <UnstyledButton
          className={cx(classes.user, { [classes.userActive]: userMenuOpened })}
        >
          <Group spacing={7}>
            <Text weight={500} size="sm" sx={{ lineHeight: 1 }} mr={3}>
              {auth.user ?? 'Гость'}
            </Text>
            <IconChevronDown size={rem(12)} stroke={1.5} />
          </Group>
        </UnstyledButton>
      </Menu.Target>
      <Menu.Dropdown>
        {auth.user ? (
          <Menu.Item
            icon={<IconLogout size="0.9rem" stroke={1.5} />}
            onClick={handleSignOut}
          >
            Logout
          </Menu.Item>
        ) : (
          <Menu.Item
            icon={<IconLogin size="0.9rem" stroke={1.5} />}
            onClick={() => navigate('/login')}
          >
            Вход
          </Menu.Item>
        )}
      </Menu.Dropdown>
    </Menu>
  );
}

export { UserMenu };
