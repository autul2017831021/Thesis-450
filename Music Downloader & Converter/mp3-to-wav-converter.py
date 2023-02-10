import subprocess
import glob
mp3_path = 'mp3\\'
wav_path = 'wav\\'
for audio in glob.glob(mp3_path + '*'):
    song_name = audio.split('\\')[-1]
    wav_song_name = song_name.split('.')[-2] + '.wav'
    wav_song = wav_path+wav_song_name
    subprocess.call(['ffmpeg', '-i', audio, wav_song])