// +build ignore

package main

import (
	"log"
    "fmt"
    "net/http"
	"crypto/sha1"
    "encoding/base64"
	"strconv"
	"strings"
	"encoding/json"
	"io/ioutil"
)

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
		panic(err)
	}
	n1 := data.N1
	n2 := data.N2
	var sum = hashIt(n1, n2)
    fmt.Fprintf(w, "%s", sum)
}

func handlerWrite(w http.ResponseWriter, r *http.Request) {
	content, _ := ioutil.ReadFile("../text.txt")
	text := string(content)
	lines := strings.Split(text, "\n")
	query := r.URL.Query()
    lineNumStr := query.Get("l")
	lineNum, _ := strconv.Atoi(lineNumStr)
	result := lines[lineNum]
	fmt.Fprintf(w, "%s", result)
}

func hashIt(n1 int, n2 int) []byte {
	var n = n1 + n2
	s := strconv.Itoa(n)
	bv := []byte(s) 
	hasher := sha1.New()
    hasher.Write(bv)
    sha := base64.URLEncoding.EncodeToString(hasher.Sum(nil))
	resObj := &result{ Result: sha }
	res, _ := json.Marshal(resObj)
	return res
}

func main() {

    http.HandleFunc("/go/sha256", handlerSha)
	http.HandleFunc("/go/write", handlerWrite)
    log.Fatal(http.ListenAndServe(":8080", nil))
}


