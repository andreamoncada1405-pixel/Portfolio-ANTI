import os

files_to_check = [
    "3.png", "A1.png", "A2.png", "A3.png", "A4.png", "A6.png", "A7.png", 
    "ALR3 - cover - NEW.png", "ALR3-cover-opt.jpg", "ALTAREA_-_Logo 1.png", "Agirc-arrco-l.png", 
    "B1.png", "B2.png", "B3.png", "B4.png", "B5.png", "B6.png", "B7.png", 
    "C1.png", "C2.png", "C3.png", "C4.png", "C5.png", "C6.png", "C7.png", "C8.png", 
    "Colas-l.png", "Cover-ALTAREA-1.png", "Cover-ALTAREA-2.png", "Cover-ALTAREA.png", 
    "D1.png", "D2.png", "Groupe Atlantis-l.png", "Img-inside-AGIRC-ARRCO.png", 
    "Img-inside-Synergie.png", "Img-inside-VAMOS.png", "Logo-HR.png", "MAMP-l.png", 
    "OPPBTP-l.png", "Photo-profil.jpg", "Synergie-l.png", "Vamos bike - l.png", 
    "Video-rockease-cover.mp4", "Video-vamos-cover.mp4", "elba-project-2.png", 
    "elba-project.png", "favicon-am.png", "kciope-preview.png", "make-cover.png", 
    "reyou-blueprint.png", "reyou-chair-wf.png", "reyou-desk-wf.png", "reyou-table-wf.png"
]

source_files = ["index.html", "style.css", "script.js"]

used_files = set()

for src in source_files:
    if os.path.exists(src):
        with open(src, 'r') as f:
            content = f.read()
            for filename in files_to_check:
                if filename in content:
                    used_files.add(filename)

print("UNUSED FILES:")
for filename in files_to_check:
    if filename not in used_files:
        print(filename)
