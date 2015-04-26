#!/bin/bash

DIR=$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )

for f in $(ls "$DIR/assets/numberfiles/"); do
	osascript "$DIR/illustrator/runMapCurves.scpt" "$DIR/assets/numberfiles/$(echo $f)" "$DIR/modules/number-dictionaries" $(echo $f | cut -d'.' -f 1)
done