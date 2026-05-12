import { Platform, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
	card: {
		position: 'relative',
		overflow: 'hidden',
		borderRadius: 18,
		borderWidth: 1,
		marginVertical: 8,
		minHeight: 128,
		...Platform.select({
			ios: {
				shadowColor: '#000',
				shadowOffset: { width: 0, height: 8 },
				shadowOpacity: 0.06,
				shadowRadius: 16
			},
			android: {
				elevation: 3
			}
		})
	},

	cardPressed: {
		opacity: 0.78,
		transform: [{ scale: 0.98 }]
	},

	accentLine: {
		position: 'absolute',
		left: 0,
		top: 0,
		bottom: 0,
		width: 5
	},

	cardBody: {
		paddingVertical: 18,
		paddingLeft: 20,
		paddingRight: 16
	},

	topRow: {
		flexDirection: 'row',
		alignItems: 'flex-start',
		justifyContent: 'space-between',
		gap: 12,
		marginBottom: 8
	},

	title: {
		flex: 1,
		fontSize: 18,
		fontWeight: '800',
		letterSpacing: 0.2
	},

	menuButton: {
		width: 28,
		height: 28,
		alignItems: 'center',
		justifyContent: 'center'
	},

	content: {
		fontSize: 14.5,
		lineHeight: 22,
		fontWeight: '500',
		marginBottom: 18
	},

	bottomRow: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		gap: 12
	},

	dateRow: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
		gap: 8
	},

	date: {
		fontSize: 13,
		fontWeight: '600'
	},

	tagPill: {
		paddingHorizontal: 12,
		paddingVertical: 6,
		borderRadius: 999,
		maxWidth: 95
	},

	tagText: {
		fontSize: 13,
		fontWeight: '700'
	}
});

export default styles;
