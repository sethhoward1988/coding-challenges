#!/bin/bash
#will upload the students file into the students array
count=0
while read students[$count] ; do
((count++))
done < names.txt
#declare variables
((first=0))
((last=$count-1))
#read variable value from user
read -p 'Enter Student Name: ' tname
#uses the typed in variable for the binary search loop
while [[ $first -le $last ]]
do
((m=($first+$last)/2))
name=`echo ${students[$m]} | cut -d: -f1`
grade=`echo ${students[$m]} | cut -d: -f2`
    
    if [[ $tname = $name ]] ; then
    break
    elif [[ $tname < $name ]] ; then
    ((last=$m-1))
    elif [[ $tname > $name ]] ; then
    ((first=$m+1))
    fi
done
#matched name and grade gets printed, else if name cannot be found, prints error message
if [[ $tname = $name ]] ; then
    echo ${students[$m]}
else 
    echo Student name not in registry
fi