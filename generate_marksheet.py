#!/usr/bin/env python3
import subprocess
import os

def generate_marksheet(name="SHASHWAT SINGH", email="ss7495@srmist.edu.in", assignment="21.38", exam="60.62", final_score="82.00", output_pdf="client/public/marksheet/NPTEL_Mark_Sheet.pdf"):
    gen_time = "November 18, 2026 08:59"

    ps_code = f"""%!PS-Adobe-3.0
%%BoundingBox: 0 0 595 842
%%Pages: 1
%%Page: 1 1

/centertext {{
    dup stringwidth pop 2 div neg 0 rmoveto show
}} bind def

/righttext {{
    dup stringwidth pop neg 0 rmoveto show
}} bind def

% Draw border box helper
/drawcell {{
    % stack: x y w h
    /ch exch def
    /cw exch def
    /cy exch def
    /cx exch def
    0.82 0.82 0.82 setrgbcolor
    0.5 setlinewidth
    newpath
    cx cy moveto
    cw 0 rlineto
    0 ch rlineto
    cw neg 0 rlineto
    closepath
    stroke
}} bind def

% Title: NPTEL — Consolidated Mark Sheet
0.05 0.42 0.88 setrgbcolor
/Helvetica-Bold findfont 16 scalefont setfont
50 775 moveto
(NPTEL) show
currentpoint pop 4 add /xpos exch def
0.05 0.42 0.88 setrgbcolor
1.5 setlinewidth
newpath
xpos 780 moveto
10 0 rlineto
stroke
xpos 14 add 775 moveto
(Consolidated Mark Sheet) show

% Subtitle
0.35 0.35 0.35 setrgbcolor
/Helvetica findfont 9.5 scalefont setfont
50 765 moveto
(National Programme on Technology Enhanced Learning) show

% Candidate Info
0.15 0.15 0.15 setrgbcolor
/Helvetica-Bold findfont 8.5 scalefont setfont
50 725 moveto (Name:) show
50 711 moveto (Email:) show
50 697 moveto (Generated:) show

/Helvetica findfont 8.5 scalefont setfont
115 725 moveto ({name}) show
115 711 moveto ({email}) show
115 697 moveto ({gen_time}) show

% Table layout
% Left margin: 50, Total width: 495
% Cols:
% Course: 145
% NOC ID: 60
% Semester: 60
% Assignment/25: 60
% Exam/75: 55
% Final/100: 55
% Result: 60

% Header Y: 645, Height: 28
% Row 1 Y: 617, Height: 28

% Header row backgrounds & borders
0.5 setlinewidth
0.82 0.82 0.82 setrgbcolor

% Headers
% x coordinates:
% 50, 195, 255, 315, 375, 430, 485, 545

% Draw header boxes
50 645 145 28 drawcell
195 645 60 28 drawcell
255 645 60 28 drawcell
315 645 60 28 drawcell
375 645 55 28 drawcell
430 645 55 28 drawcell
485 645 60 28 drawcell

% Header text
0.15 0.15 0.15 setrgbcolor
/Helvetica-Bold findfont 8 scalefont setfont

58 656 moveto (Course) show

225 656 moveto (NOC ID) centertext
285 656 moveto (Semester) centertext

345 660 moveto (Assignment /) centertext
345 650 moveto (25) centertext

402.5 660 moveto (Exam /) centertext
402.5 650 moveto (75) centertext

457.5 660 moveto (Final /) centertext
457.5 650 moveto (100) centertext

515 656 moveto (Result) centertext

% Data Row 1 (DBMS)
50 617 145 28 drawcell
195 617 60 28 drawcell
255 617 60 28 drawcell
315 617 60 28 drawcell
375 617 55 28 drawcell
430 617 55 28 drawcell
485 617 60 28 drawcell

% Data text
0.15 0.15 0.15 setrgbcolor
/Helvetica findfont 8 scalefont setfont
58 628 moveto (Data Base Management System) show

225 628 moveto (noc26-) centertext
/Helvetica findfont 7.5 scalefont setfont
225 620 moveto (cs117) centertext

/Helvetica findfont 8 scalefont setfont
285 628 moveto (Jul-Dec) centertext
285 619 moveto (2026) centertext

345 625 moveto ({assignment}) centertext
402.5 625 moveto ({exam}) centertext
457.5 625 moveto ({final_score}) centertext

% Result: PASS in green
0.1 0.55 0.25 setrgbcolor
/Helvetica-Bold findfont 8.5 scalefont setfont
515 625 moveto (PASS) centertext

% Disclaimer note below table
0.5 0.5 0.5 setrgbcolor
/Helvetica findfont 7.2 scalefont setfont
50 595 moveto (This mark sheet is generated from loaded results. Scores are produced by the NPTEL evaluation pipeline. For official certificates, see your course) show
50 585 moveto (pages.) show

showpage
%%EOF
"""
    tmp_ps = f"/tmp/marksheet_{abs(hash(output_pdf))}.ps"
    with open(tmp_ps, "w") as f:
        f.write(ps_code)
    
    cmd = [
        "gs",
        "-dNOPAUSE",
        "-dBATCH",
        "-sDEVICE=pdfwrite",
        f"-sOutputFile={output_pdf}",
        tmp_ps
    ]
    subprocess.run(cmd, check=True)
    if os.path.exists(tmp_ps):
        os.remove(tmp_ps)
    print(f"Generated {output_pdf}")

if __name__ == "__main__":
    os.makedirs("client/public/marksheet", exist_ok=True)
    os.makedirs("client/dist/marksheet", exist_ok=True)
    
    # Shashwat
    generate_marksheet(name="SHASHWAT SINGH", email="ss7495@srmist.edu.in", assignment="21.38", exam="60.62", final_score="82.00", output_pdf="client/public/marksheet/NPTEL_Mark_Sheet.pdf")
    generate_marksheet(name="SHASHWAT SINGH", email="ss7495@srmist.edu.in", assignment="21.38", exam="60.62", final_score="82.00", output_pdf="client/dist/marksheet/NPTEL_Mark_Sheet.pdf")
    generate_marksheet(name="SHASHWAT SINGH", email="ss7495@srmist.edu.in", assignment="21.38", exam="60.62", final_score="82.00", output_pdf="client/public/marksheet/NPTEL_Mark_Sheet_shashwat.pdf")
    generate_marksheet(name="SHASHWAT SINGH", email="ss7495@srmist.edu.in", assignment="21.38", exam="60.62", final_score="82.00", output_pdf="client/dist/marksheet/NPTEL_Mark_Sheet_shashwat.pdf")

    # Himanshu
    generate_marksheet(name="HIMANSHU GOLYA", email="hg4210@srmist.edu.in", assignment="17.38", exam="47.62", final_score="65.00", output_pdf="client/public/marksheet/NPTEL_Mark_Sheet_himanshu.pdf")
    generate_marksheet(name="HIMANSHU GOLYA", email="hg4210@srmist.edu.in", assignment="17.38", exam="47.62", final_score="65.00", output_pdf="client/dist/marksheet/NPTEL_Mark_Sheet_himanshu.pdf")

    # Pratham
    generate_marksheet(name="PRATHAM GOYAL", email="pg7071@srmist.edu.in", assignment="17.78", exam="49.22", final_score="67.00", output_pdf="client/public/marksheet/NPTEL_Mark_Sheet_pratham.pdf")
    generate_marksheet(name="PRATHAM GOYAL", email="pg7071@srmist.edu.in", assignment="17.78", exam="49.22", final_score="67.00", output_pdf="client/dist/marksheet/NPTEL_Mark_Sheet_pratham.pdf")
