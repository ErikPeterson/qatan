on run argv
	tell application "Finder"
	    set script_path to POSIX path of (parent of (path to me) as string)
    end tell
    tell application "Adobe Illustrator"
        set js to do javascript ("#include '" & script_path & "mapCurves.jsx';") & return
        set js to js & "main(arguments);" & return
        do javascript js with arguments argv
    end tell
end run