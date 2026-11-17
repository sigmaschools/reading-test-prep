module readingtestprep/level

go 1.26.11

require github.com/sigmaschools/compass v0.0.0

require golang.org/x/text v0.43.0 // indirect

// The measure lives in compass-lab; check it out beside this repository.
replace github.com/sigmaschools/compass => ../../../compass-lab/compass
