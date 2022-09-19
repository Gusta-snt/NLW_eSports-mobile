import { SafeAreaView } from 'react-native-safe-area-context'
import { useRoute, useNavigation } from '@react-navigation/native'
import { GameParams } from './../../@types/navigation'
import { View, TouchableOpacity, Image, FlatList, Text } from 'react-native';
import { Entypo } from '@expo/vector-icons'
import { useEffect, useState } from 'react'

import { styles } from './styles'
import logoImg from './../../assets/logo-nlw-esports.png'
import { THEME } from './../../theme'


import { Background } from './../../components/Background'
import { Heading } from './../../components/Heading'
import { DuoCard, DuoCardProps } from './../../components/DuoCard'
import { DuoMatch } from './../../components/DuoMatch'

import { API_LINK } from './../../../env.ts'

export function Game() {
	const route = useRoute()
	const game = route.params as GameParams
	const navigation = useNavigation()
	const [ads, setAds] = useState<DuoCardProps[]>([])
	const [discordDueSelected, setDiscordDuoSelected] = useState('')

	function handleGoBack() {
		navigation.goBack()
	}

	async function getDiscordUser(adsId: string) {
		fetch(`${API_LINK}/ads/${adsId}/discord`).then(response => response.json()).then(data => setDiscordDuoSelected(data.discord))
	}

	useEffect(() => {
    	fetch(`${API_LINK}/games/${game._id}/ads`).then(response => response.json()).then(data => setAds(data))
  	},[])

	return (
		<Background>
			<SafeAreaView style={styles.container}>
				<View style={styles.header}>
					<TouchableOpacity onPress={handleGoBack}>
						<Entypo
							name="chevron-thin-left"
							color={THEME.COLORS.CAPTION_300}
							size={20}
						/>
					</TouchableOpacity>
					<Image 
						source={logoImg}
						style={styles.logo}
					/>
					<View style={styles.right}/>
				</View>
				<Image
					source={{uri: game.bannerURL}}
					style={styles.cover}
					resizeMode="cover"
				/>
				<Heading
					title={game.title}
					subtitle="Conecte-se e comece a jogar!"
				/>
				<FlatList
					data={ads}
					keyExtractor={item => item._id}
					renderItem={({item}) => {
						return <DuoCard key={item._id} data={item} onConnect={() => getDiscordUser(item._id)}/>
					}}
					horizontal
					contentContainerStyle={[ads.length > 0 ? styles.contentList : styles.emptyListContent]}
					showsHorizontalScrollIndicator={false}
					style={styles.containerList}

					ListEmptyComponent={() => {
						return (
								<Text style={styles.emptyListText}>
									Não há anúncios para este jogo no momento.
								</Text>
							)
					}}
				/>
				<DuoMatch
					visible={discordDueSelected.length > 0}
					discord={discordDueSelected}
					onClose={() => setDiscordDuoSelected('')}
				/>
			</SafeAreaView>
		</Background>
	)
}