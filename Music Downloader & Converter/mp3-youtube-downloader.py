# importing packages
from pytube import YouTube
import os

# url input from user
def download_mp3(yt):
	# extract only audio
	video = yt.streams.filter(only_audio=True).first()

	# check for destination to save file
	# print("Enter the destination (leave blank for current directory)")
	# destination = str(input(">> ")) or '.'
	# manually giving a directory
	destination = 'mp3'

	# download the file
	out_file = video.download(output_path=destination)

	# save the file
	base, ext = os.path.splitext(out_file)
	#new_file = base + '.mp3'
	new_file = base + '.mp3'
	os.rename(out_file, new_file)

	# result of success
	print(yt.title + " has been successfully downloaded.")

while(1):
	yt = YouTube(str(input("Enter the URL of the video you want to download: \n>> ")))
	download_mp3(yt)


	
