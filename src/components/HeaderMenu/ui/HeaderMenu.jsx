import {
  createStyles,
  Container,
  Group,
  Burger,
  rem,
  Title,
  Transition,
  Paper,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Link, NavLink } from 'react-router-dom';
import { getHeaderLinks } from '../helpers';
import { UserMenu } from '../../UserMenu';
import { ThemeToggle } from '../../ThemeToggle';

const HEADER_HEIGHT = rem(60);

const useStyles = createStyles((theme) => ({
  inner: {
    height: HEADER_HEIGHT,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  links: {
    [theme.fn.smallerThan('sm')]: {
      display: 'none',
    },
  },

  burger: {
    [theme.fn.largerThan('sm')]: {
      display: 'none',
    },
  },

  link: {
    display: 'block',
    lineHeight: 1,
    padding: `${rem(8)} ${rem(12)}`,
    borderRadius: theme.radius.sm,
    textDecoration: 'none',
    color:
      theme.colorScheme === 'dark'
        ? theme.colors.dark[0]
        : theme.colors.gray[7],
    fontSize: theme.fontSizes.sm,
    fontWeight: 500,

    '&:hover': {
      backgroundColor:
        theme.colorScheme === 'dark'
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
    },
    '&.active': {
      backgroundColor:
        theme.colorScheme === 'dark'
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
    },
  },

  homelink: {
    textDecoration: 'none',
    color:
      theme.colorScheme === 'dark'
        ? theme.colors.dark[0]
        : theme.colors.gray[7],
  },

  linkLabel: {
    marginRight: rem(5),
  },
  dropdown: {
    position: 'absolute',
    top: HEADER_HEIGHT,
    left: 0,
    right: 0,
    zIndex: 0,
    borderTopRightRadius: 0,
    borderTopLeftRadius: 0,
    borderTopWidth: 0,
    overflow: 'hidden',

    [theme.fn.largerThan('sm')]: {
      display: 'none',
    },
  },
}));

function HeaderMenu() {
  const links = getHeaderLinks('main');
  const { classes } = useStyles();
  const [opened, { toggle }] = useDisclosure(false);

  const items = links.map((link) => {
    return (
      <NavLink
        to={link.path}
        key={link.label}
        className={({ isActive }) => `${classes.link} ${isActive && 'active'}`}
      >
        {link.label}
      </NavLink>
    );
  });

  return (
    <Container className={classes.inner}>
      <Group>
        <Burger
          opened={opened}
          onClick={toggle}
          className={classes.burger}
          size="sm"
        />
        <Transition transition="pop-top-right" duration={200} mounted={opened}>
          {(styles) => (
            <Paper className={classes.dropdown} withBorder style={styles}>
              {items}
            </Paper>
          )}
        </Transition>
        <Link to="/" className={classes.homelink}>
          <Title order={5}>Rick and Morty</Title>
        </Link>
      </Group>

      <Group spacing={5} className={classes.links}>
        {items}
      </Group>
      <Group spacing={5}>
        <ThemeToggle />
        <UserMenu />
      </Group>
    </Container>
  );
}

export { HeaderMenu };
