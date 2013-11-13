#!/bin/bash

# Instantiate an array
counter=0
# Read in file with names and append to array
while read line
do
    arrIN=(${line//:/ })
    array[$counter]=${arrIN[0]}    #$line #$arrIN[0]
    grades[$counter]=${arrIN[1]}
    counter=$[counter+1]
done < $1

function binarySearch {
    local value=$1

    local startIndex=0
    local len=${#array[*]}
    local stopIndex=$[len-1]
    local middle=$[(stopIndex+startIndex)/2]

    while [ ${array[$middle]} != $value ] && [ $startIndex -lt $stopIndex ]; do
        # Adjust the search area
        if [[ $value < ${array[$middle]} ]]; then
            stopIndex=$[$middle-1]
        elif [[ $value > ${array[$middle]} ]]; then
            startIndex=$[middle+1]
        fi

        # Recalculate the middle
        middle=$[(stopIndex+startIndex)/2]
    done

    if [[ ${array[$middle]} = $value ]]; then
        echo "$value has a ${grades[$middle]}"
    elif [[ ${array[$middle]} != $value ]]; then
        echo "There is no record for $value"
    fi

    main

    exit

}

function main {
    PS3='Please enter your choice: '
    options=("Record Lookup" "Exit")
    select opt in "${options[@]}"
    do
        case $opt in
            "Record Lookup")
                # Prompt for user search
                read -p "What is the value you are searching for? " value
                binarySearch $value
                ;;
            "Exit")
                break
                ;;
            *) echo invalid option;;
        esac
    done
}

main
