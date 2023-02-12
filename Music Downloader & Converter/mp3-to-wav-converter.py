import subprocess
import glob
mp3_path = 'mp3\\'
bangladesh_song_folder = 'bangladesh_song_folder\\'
kolkata_song_folder = 'kolkata_song_folder\\'
wav_path = kolkata_song_folder
for audio in glob.glob(mp3_path + '*.mp3'):
    song_name = audio.split('\\')[-1]
    wav_song_name = song_name.split('.')[-2] + '.wav'
    wav_song = wav_path+wav_song_name
    subprocess.call(['ffmpeg', '-i', audio, wav_song])