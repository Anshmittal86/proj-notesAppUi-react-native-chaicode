import { Stack } from 'expo-router';
import { useColorScheme } from 'react-native';

export default function RootLayout() {
	const colorScheme = useColorScheme();

	return (
		<Stack
			screenOptions={{
				headerShown: false,
				contentStyle: {
					backgroundColor: colorScheme === 'dark' ? '#111827' : '#F3F4F6'
				}
			}}
		>
			<Stack.Screen name="index" />
			<Stack.Screen name="editor" />
		</Stack>
	);
}
