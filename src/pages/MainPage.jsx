import { Flex, Image } from '@mantine/core';

export default function MainPage() {
  return (
    <Flex justify="flex-center" align="flex-start" w="100">
      <Image
        mx="auto"
        fit="contain"
        src="assets/Rick-And-Morty-Logo.png"
        alt="Rick-And-Morty-Logo"
      />
    </Flex>
  );
}
