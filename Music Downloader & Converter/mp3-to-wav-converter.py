import subprocess
import glob
mp3_path = 'mp3\\'

for audio in glob.glob(mp3_path + '*'):
    song_name = audio.split('\\')[-1]
    wav_song_name = song_name.split('.')[-2] + '.wav'
    subprocess.call(['ffmpeg', '-i', audio, wav_song_name])