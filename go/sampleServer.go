// +build ignore

package main

import (
	"log"
    "fmt"
    "net/http"
	"crypto/sha256"
	"strconv"
	"strings"
	"encoding/json"
	"io/ioutil"
)

var lines []string

type nums struct {
	N1 int `json:"n1"`
	N2 int `json:"n2"`
}

type result struct { Result string `json:"result"` }

func handlerSha(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	decoder := json.NewDecoder(r.Body)
	
	var data nums
	err := decoder.Decode(&data)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		fmt.Fprintf(w, "invalid numbers")
	} else {
		n1 := data.N1
		n2 := data.N2
		var sum = hashIt(n1, n2)
		fmt.Fprintf(w, "%s", sum)
	}
}

func hashIt(n1 int, n2 int) []byte {
	var n = n1 + n2
	s := strconv.Itoa(n)	
    shaa := sha256.Sum256([]byte(s))
	sha := fmt.Sprintf("%x", shaa)
	resObj := &result{ Result: sha }
	res, _ := json.Marshal(resObj)
	return res
}

func handlerWrite(w http.ResponseWriter, r *http.Request) {
	query := r.URL.Query()
    lineNumStr := query.Get("l")
	lineNum, err := strconv.Atoi(lineNumStr)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		fmt.Fprintf(w, "invalid number")
	} else if (lineNum < 1 || lineNum > 100) {
		w.WriteHeader(http.StatusBadRequest)
		fmt.Fprintf(w, "out of range")
	} else {
		result := lines[lineNum]
		fmt.Fprintf(w, "%s", result)
	}
}

func main() {
	content, _ := ioutil.ReadFile("/root/server/text.txt")
	text := string(content)
	lines = strings.Split(text, "\n")
	fmt.Println("start")
    http.HandleFunc("/go/sha256", handlerSha)
	http.HandleFunc("/go/write", handlerWrite)
    log.Fatal(http.ListenAndServe(":8082", nil))
}


