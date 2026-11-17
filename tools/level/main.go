// Copyright 2026 Sigma
// SPDX-License-Identifier: Apache-2.0

// The Compass reading-level measure, run locally on the pipeline's passages.
// It needs a checkout of compass-lab beside this repository (see go.mod).
// Reads JSON [{id,text,target}] on stdin, writes JSON results: level, words, guidance summary.
package main

import (
	"encoding/json"
	"os"

	rl "github.com/sigmaschools/compass/readinglevel"
)

type in struct {
	ID     string `json:"id"`
	Text   string `json:"text"`
	Target int    `json:"target"`
}
type out struct {
	ID       string   `json:"id"`
	Level    int      `json:"level"`
	Words    int      `json:"words"`
	Reliable bool     `json:"reliable"`
	Advice   []string `json:"advice,omitempty"`
	Guidance string   `json:"guidance,omitempty"`
}

func main() {
	var xs []in
	if err := json.NewDecoder(os.Stdin).Decode(&xs); err != nil {
		panic(err)
	}
	var res []out
	for _, x := range xs {
		o := out{ID: x.ID}
		if x.Text != "" {
			m, err := rl.Measure(x.Text, rl.Plain)
			if err == nil {
				o.Level, o.Words, o.Reliable = m.Level, m.Words, m.Reliable
				if x.Target > 0 {
					if c, err := rl.Compare(m, x.Target); err == nil {
						o.Advice = c.Advice
					}
				}
			}
		} else if x.Target > 0 {
			if g, err := rl.GuidanceFor(x.Target); err == nil {
				o.Guidance = g.Summary
			}
		}
		res = append(res, o)
	}
	json.NewEncoder(os.Stdout).Encode(res)
}
