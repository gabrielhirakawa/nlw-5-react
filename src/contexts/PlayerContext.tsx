import { createContext, ReactNode, useContext, useState } from 'react'

type Episode = {
    title: string;
    members: string;
    thumbnail: string;
    duration: number;
    url: string;
}
 
type PlayerContextData = {
    episodeList: Array<Episode>;
    currentEpisodeIndex: number;
    isPlaying: boolean;
    isLooping: boolean;
    isShuffling: boolean;
    play: (episode: Episode) => void;
    playNext: () => void;
    playPrevious: () => void;
    playList: (episode: Array<Episode>, index: number) => void;
    togglePlay: () => void;
    toggleLoop: () => void;
    toggleShuffle: () => void;
    clearPlayerState: () => void;
    setPlayingState: (state: boolean) => void;
    hasNext: boolean;
    hasPrevious: boolean;
}

type PlayerContextProviderProps = {
    children: ReactNode;
}

export const PlayerContext = createContext({} as PlayerContextData)


export function PlayerContextProvider({ children }: PlayerContextProviderProps){
    const [episodeList, setEpisodeList] = useState([]);
    const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isLooping, setIsLooping] = useState(false);
    const [isShuffling, setIsShuffling] = useState(false);

    const hasPrevious = currentEpisodeIndex > 0
    const hasNext = isShuffling || (currentEpisodeIndex + 1) < episodeList.length
  
    function play(episode: Episode){
      setEpisodeList([episode]);
      setCurrentEpisodeIndex(0);
      setIsPlaying(true);
    }

    function playList(list: Episode[], index: number){
        setEpisodeList(list);
        setCurrentEpisodeIndex(index);
        setIsPlaying(true);
    }
  
    function togglePlay(){
      setIsPlaying(!isPlaying);
    }

    function toggleShuffle(){
        setIsShuffling(!isShuffling);
    }
  
    function toggleLoop(){
        setIsLooping(!isLooping);
    }

    function clearPlayerState(){
        setEpisodeList([]);
        setCurrentEpisodeIndex(0);
    }

    function playNext(){
        if(isShuffling){
            const nextRandomEpisodeIndex = Math.floor(Math.random() * episodeList.length)
            setCurrentEpisodeIndex(nextRandomEpisodeIndex)
        }
        else if(hasNext){
            setCurrentEpisodeIndex(currentEpisodeIndex+1)
        }    
    }

    function playPrevious(){
        if(isShuffling){

        }
        else if(hasPrevious){
            setCurrentEpisodeIndex(currentEpisodeIndex -1)
        }
    }
  
    function setPlayingState(state: boolean){
      setIsPlaying(state);
    }
    return(
        <PlayerContext.Provider value={{ 
            episodeList, 
            currentEpisodeIndex, 
            play, 
            playList,
            playNext,
            playPrevious,
            togglePlay, 
            setPlayingState,
            hasNext,
            hasPrevious,
            toggleLoop,
            toggleShuffle,
            isShuffling,
            isLooping,
            clearPlayerState,
            isPlaying }}
        >
                {children}
        </PlayerContext.Provider>
    )
}

export const usePlayer = () => {
    return useContext(PlayerContext)
}

 