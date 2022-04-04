import React from "react";
import {
  Box,
  Flex,
  Text,
  IconButton,
  Button,
  Stack,
  Collapse,
  Link,
  Popover,
  PopoverTrigger,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import LoginCard from "./Login";
import SignupCard from "./Register";
import { UserContext } from "./UserProvider";
import logo from "../images/logo.jpg";
import "../App.css";

export default function NavBar() {
  const { user, setUser } = React.useContext(UserContext);
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [showLogin, setShowLogin] = React.useState(false);
  const [showRegister, setShowRegister] = React.useState(false);
  const { isOpen, onToggle } = useDisclosure();
  React.useEffect(() => {
    setLoggedIn(
      typeof user === "object" &&
        user !== null &&
        user !== undefined &&
        Object.keys(user)?.length > 0
    );
  }, [user]);

  return (
    <Box>
      {!loggedIn && showLogin && (
        <LoginCard onClose={() => setShowLogin(false)} />
      )}
      {!loggedIn && showRegister && (
        <SignupCard onClose={() => setShowRegister(false)} />
      )}
      <Flex
        className="navbar"
        bg={useColorModeValue("white", "gray.800")}
        color={useColorModeValue("gray.600", "white")}
        minH={"60px"}
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={1}
        borderStyle={"solid"}
        borderColor={useColorModeValue("gray.200", "gray.900")}
        align={""}
      >
        <Flex
          flex={{ base: 1, md: "auto" }}
          ml={{ base: -2 }}
          display={{ base: "flex", md: "none" }}
        >
          <IconButton
            onClick={onToggle}
            icon={
              isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />
            }
            variant={"ghost"}
            aria-label={"Toggle Navigation"}
          />
        </Flex>
        <Flex flex={{ base: 1 }} justify={{ base: "", md: "start" }}>
          <Link href={"/"}>
            <img src={logo} alt="logo" width={70} height={70} />
          </Link>
          <Flex display={{ base: "none", md: "flex" }} ml={10}>
            <DesktopNav />
          </Flex>
        </Flex>

        <Stack
          flex={{ base: 1, md: 0 }}
          justify={"flex-end"}
          direction={"row"}
          spacing={6}
        >
          {!loggedIn && (
            <>
              <Button
                onClick={() => setShowLogin(true)}
                as={"a"}
                fontSize={"sm"}
                fontWeight={400}
                variant={"link"}
                href={"#"}
              >
                Sign In
              </Button>
              <Button
                onClick={() => setShowRegister(true)}
                fontSize={"sm"}
                fontWeight={600}
                color={"white"}
                bg={"purple.400"}
                href={"#"}
                _hover={{
                  bg: "purple.300",
                }}
              >
                Sign Up
              </Button>
            </>
          )}
          {loggedIn && (
            <Button
              fontSize={"sm"}
              fontWeight={600}
              color={"white"}
              bg={"purple.400"}
              href={"#"}
              _hover={{
                bg: "purple.300",
              }}
              onClick={() => {
                setUser({});
                localStorage.removeItem("user");
              }}
            >
              Logout
            </Button>
          )}
        </Stack>
      </Flex>
      <Collapse in={isOpen} animateOpacity>
        <MobileNav />
      </Collapse>
      <br></br>
      <br></br>
    </Box>
  );
}

const DesktopNav = () => {
  const linkColor = useColorModeValue("gray.600", "gray.200");
  const linkHoverColor = useColorModeValue("gray.800", "white");

  return (
    <Stack direction={"row"} spacing={4}>
      {NAV_ITEMS.map((navItem) => (
        <Box key={navItem.label}>
          <Popover trigger={"hover"} placement={"bottom-start"}>
            <PopoverTrigger>
              <Link
                p={2}
                href={navItem.href ?? "#"}
                fontSize={"sm"}
                fontWeight={500}
                color={linkColor}
                _hover={{
                  textDecoration: "none",
                  color: linkHoverColor,
                }}
              >
                {navItem.label}
              </Link>
            </PopoverTrigger>
          </Popover>
        </Box>
      ))}
    </Stack>
  );
};

const MobileNav = () => {
  return (
    <Stack
      bg={useColorModeValue("white", "gray.800")}
      p={4}
      display={{ md: "none" }}
    >
      {NAV_ITEMS.map((navItem) => (
        <MobileNavItem key={navItem.label} {...navItem} />
      ))}
    </Stack>
  );
};

const MobileNavItem = ({ label, href }: NavItem) => {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Stack spacing={4} onClick={onToggle}>
      <Flex
        py={2}
        as={Link}
        href={href ?? "#"}
        justify={"space-between"}
        align={""}
        _hover={{
          textDecoration: "none",
        }}
      >
        <Text
          fontWeight={600}
          color={useColorModeValue("gray.600", "gray.200")}
        >
          {label}
        </Text>
      </Flex>

      <Collapse in={isOpen} animateOpacity style={{ marginTop: "0!important" }}>
        <Stack
          mt={2}
          pl={4}
          borderLeft={1}
          borderStyle={"solid"}
          borderColor={useColorModeValue("gray.200", "gray.700")}
          align={"start"}
        ></Stack>
      </Collapse>
    </Stack>
  );
};

interface NavItem {
  label: string;
  subLabel?: string;
  href?: string;
}

const NAV_ITEMS: Array<NavItem> = [
  // {
  //   label: 'Browse Bids',
  //   href: '#',
  // },
  // {
  //   label: 'Create Bids',
  //   href: '#',
  // },
  // {
  //   label: 'My Bids',
  //   href: '#',
  // },
  // {
  //   label: 'Hire Designers',
  //   href: '#',
  // },
];
