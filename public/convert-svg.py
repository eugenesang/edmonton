import os
import cairosvg

# Specify the input and output folders
input_folder = './images'
output_folder = './converted'

# Ensure the output folder exists
os.makedirs(output_folder, exist_ok=True)

# Function to convert .svg images to .png
def convert_svg_to_png(input_folder, output_folder):
    for filename in os.listdir(input_folder):
        file_path = os.path.join(input_folder, filename)
        file_name, file_extension = os.path.splitext(filename)

        # Convert .svg to .png
        if file_extension.lower() == '.svg':
            new_file = os.path.join(output_folder, file_name + '.png')
            cairosvg.svg2png(url=file_path, write_to=new_file)
            print(f'Converted {filename} to PNG and saved in {output_folder}.')

# Call the function to start the conversion
convert_svg_to_png(input_folder, output_folder)