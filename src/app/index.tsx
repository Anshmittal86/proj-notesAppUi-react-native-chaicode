import React, { useState } from 'react';
import { View } from 'react-native';
import NoteEditorScreen from '../../components/NoteEditorScreen/NoteEditorScreen';
import NotesListingScreen from '../../components/NotesListingScreen/NotesListingScreen';

export default function App() {
	// Change 'list' to 'editor' below to preview the Note Editor screen directly.
	// This state is only used to show both required assignment screens.
	// No actual navigation flow is implemented.
	const [activeScreen, setActiveScreen] = useState<'list' | 'editor'>('list');

	return (
		<View style={{ flex: 1 }}>
			{activeScreen === 'list' ?
				<NotesListingScreen onOpenEditor={() => setActiveScreen('editor')} />
			:	<NoteEditorScreen onBack={() => setActiveScreen('list')} />}
		</View>
	);
}
