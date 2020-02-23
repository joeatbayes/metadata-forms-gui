package main
//"encoding/json"

import (
	"fmt"
	"io"
	"io/ioutil"
	"log"
	"net/http"
	"net/url"
	"os"
	"os/exec"
	"strings"
)

/* Simple handler to demonstrate responding to
a posted form.   Can be accessed via:
http://127.0.0.1:9601/ping?name=Joe&handle=workinghard
values will print to console. */
func ping(w http.ResponseWriter, r *http.Request) {
	w.Header().Add("content-type", "text/plain")
	r.ParseForm() // parse arguments, you have to call this by yourself
	w.WriteHeader(http.StatusOK)
	fmt.Println(r.Form) // print form information in server side
	fmt.Println("path", r.URL.Path)
	fmt.Println("scheme", r.URL.Scheme)
	fmt.Println("query", r.URL.Query())
	fmt.Println("url ", r.URL.RequestURI())
	fmt.Println(r.Form["url_long"])
	fmt.Fprintf(w, "printFormVal\n url=%s\n", r.URL.Path) // send data to client side
	for k, v := range r.Form {
		fmt.Println("key:", k, "\t", " val:", strings.Join(v, ""))
		fmt.Fprintf(w, "key:%s\t val=%s\n", k, strings.Join(v, ""))
	}
}

// Generalized handler to process basic Python
// CGI calls passing the relative values to the
// python through CGI enviornment variables.
// reading result from stdout.   Use this as
// to allow local testing of CGI scripts from
// inside the GO enviornment.
func simplePythonCGI(w http.ResponseWriter, r *http.Request, cwd string, scriptPath string) {
	var urstr = r.URL.RequestURI()
	var ursplt = strings.SplitN(urstr, "?", 2)
	fmt.Println("ursplt=", ursplt)
	var queryPart = ""
	if len(ursplt) == 2 {
		queryPart = ursplt[1]
	}
	fmt.Println("queryPart=", queryPart)

	binary, err := exec.LookPath("python.exe")
	if err != nil {
		// Need to detect error and send back server error
		// code.
		//return err
	}
	fmt.Println("python path", binary)

	cmd := exec.Command(binary)
	env := os.Environ()
	env = append(env, fmt.Sprintf("QUERY_STRING=%s", queryPart))
	// TODO:  Add the other things like method, remote client IP, cookies, Etc
	//     so they comply with the basic CGI expectations

	cmd.Env = env
	cmd.Dir = cwd
	cmd.Args = append(cmd.Args, scriptPath)

	cmdOut, _ := cmd.StdoutPipe()
	//cmdErr, _ := cmd.StderrPipe()

	startErr := cmd.Start()
	if startErr != nil {
		// Need to detect error and send back server error
		// code.
		//return startErr
	}

	// read stdout and stderr
	stdOutput, _ := ioutil.ReadAll(cmdOut)
	// note would be faster and less memory
	// to parse the headers out by leaving everything
	// in byte format.
	fmt.Printf("STDOUT: %s\n", stdOutput)
	//errOutput, _ := ioutil.ReadAll(cmdErr)

	stdostr := strings.Replace(strings.Replace(string(stdOutput), "\r\r", "\r", -1), "\n\n", "\n", -1)
	// Needed this because for some reason my python output
	// was arriving with extra \r even though the code didn't
	// generate them. Think it is in the windows pipe.

	// Have to take the first Lines Response Code, Status Content type
	//  parse them out and use for the writer response.
	// w.Header().Set("Content-Type", "text/plain")
	//func Error(w ResponseWriter, error string, code int)
	//fmt.Printf("stdostr: %s\n", stdostr)
	resparr := strings.SplitN(stdostr, "\r\n\r\n", 2)
	headarr := strings.Split(resparr[0], "\r\n")
	//fmt.Printf("headarr: %s\n", headarr)
	//fmt.Printf("resparr len=%d: val%s\n", len(resparr),resparr)
	for _, hval := range headarr {
		//fmt.Printf(" hndx=%d hval=%s\n", hndx, hval)
		hvalarr := strings.SplitN(hval, ":", 2)
		if len(hvalarr) > 1 {
			w.Header().Set(hvalarr[0], hvalarr[1])
		}
	}

	body := resparr[1]
	io.WriteString(w, body)
	//fmt.Printf("STDOUT: %s\n", stdOutput)
	//fmt.Printf("ERROUT: %s\n", errOutput)

	err = cmd.Wait()
}

func ex_handle_query_parms(w http.ResponseWriter, r *http.Request) {
	fmt.Println("ex_handle_query_parms", r.URL.Scheme)
	var urstr = r.URL.RequestURI()
	fmt.Println("URL=", r.URL)

	// USE This approach to parse URL Query Paramters
	// as ?id=1004
	var ursplt = strings.SplitN(urstr, "?", 2)
	fmt.Println("ursplt=", ursplt)
	if len(ursplt) < 2 {
		w.WriteHeader(http.StatusBadRequest)
		fmt.Fprintf(w, "query paramter id is mandatory")
		return
	}
	qparms, err := url.ParseQuery(ursplt[1])
	fmt.Println(" parsedQuery=", qparms, " err=", err)
	tmpid, ok := qparms["id"]
	id := strings.Join(tmpid, "")
	if !ok {
		w.WriteHeader(http.StatusBadRequest)
		fmt.Fprintf(w, "query paramter id is mandatory")
		return
	}
	// Read the body string.
	fmt.Println("contentLength=", r.ContentLength)
	bodya := make([]byte, r.ContentLength)
	_, err = r.Body.Read(bodya)
	fmt.Println("read body err=", err)
	bodys := string(bodya)
	fmt.Println("bodys", bodys, " id=", id)

	fmt.Println("ready post bodys=", bodys, " err=", err)

	// Parse the Body String and compare the
	// and pull out the form ID with ID supplied
	// in the JSON body.
	//body := string(p)
	//fmt.Println("body as str=", body)
	//r.GetBody()
	//fmt.Println("printf r.body=", r.Body)
	//fmt.Println("urstr", urstr)
}

/* Update local Certificate of Need based on the posted
data string.  Example Call: http://127.0.0.1:9601/api/save-cert-of-need/111004
where 111004 is the IDof the certificate to be saved.  */
func api_save_cert_of_need(w http.ResponseWriter, r *http.Request) {
	fmt.Println("api_save_cert_of_need", r.URL.Scheme, "method=", r.Method)
	fmt.Println("URL=", r.URL)
	var urstr = r.URL.RequestURI()
	id := strings.Replace(urstr, "/api/save-cert-of-need/", "", 1)
	fmt.Println("id =", id)
	id = strings.SplitN(id, "?", 2)[0]
	id = strings.Replace(id, "\\", "-", -1)
	id = strings.Replace(id, "/", "-", -1)
	id = strings.Replace(id, " ", "-", -1)
	id = strings.Replace(id, ":", "-", -1)
	fmt.Println("id=", id)
	if len(id) < 2 {
		w.WriteHeader(http.StatusBadRequest)
		fmt.Fprintf(w, "id is mandatory as last segment of URI")
		return
	}
	// Read the body string.
	fmt.Println("contentLength=", r.ContentLength)
	bodya := make([]byte, r.ContentLength)
	_, err := r.Body.Read(bodya)

	outFiName := "data/cert-of-need/" + id + ".JSON"
	err = ioutil.WriteFile(outFiName, bodya, 0644)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		fmt.Fprintf(w, "err saving file ", err)
	}
	w.WriteHeader(http.StatusOK)
	fmt.Fprintf(w, "{'status' : 'sucess'}")

	bodys := string(bodya)
	fmt.Println("bodys=", bodys)
}

//func drains_elev_handler(w http.ResponseWriter, r *http.Request) {
//	simplePythonCGI(w, r, "C:\\jscala\\dem\\web\\doc", "drains_elev.svc")
//}

/*func downloadHandler(w http.ResponseWriter, r *http.Request) {
        r.ParseForm()
        StoredAs := r.Form.Get("StoredAs") // file name
        data, err := ioutil.ReadFile("files/"+StoredAs)
        if err != nil { fmt.Fprint(w, err) }
        http.ServeContent(w, r, StoredAs, time.Now(),   bytes.NewReader(data))
}*/

func main() {
	//http.Handle("/gen/", http.FileServer(http.Dir("data/gen")))
	//http.Handle("/csv/", http.FileServer(http.Dir("/joe/git/CSVTablesInBrowser")))

	http.Handle("/", http.FileServer(http.Dir("../http-docs")))
	http.Handle("/data/", http.StripPrefix("/data/", http.FileServer(http.Dir("../data"))))
	http.Handle("/data/dental/provider/autosug/", http.StripPrefix("/data/dental/provider/autosug/", http.FileServer(http.Dir("../docs/data/dental/provider/autosug"))))
    http.Handle("/data/dental/provider/index/", http.StripPrefix("/data/dental/provider/index/", http.FileServer(http.Dir("../docs/data/dental/provider/index"))))
    http.Handle("/data/dental/provider/recs/", http.StripPrefix("/data/dental/provider/recs/", http.FileServer(http.Dir("../docs/data/dental/provider/recs"))))

	// When path ends with "/" it is treated as a tree root
	// which allos the handler to pick up the path and any
	// sub paths such as /ping/apple.
	fmt.Println("Listening on port 9831")
	cwd, _ := os.Getwd()
	fmt.Println("cwd=", cwd) // for example /home/user

	http.HandleFunc("/ping/", ping) // set router
	http.HandleFunc("/api/save-cert-of-need/", api_save_cert_of_need)
	// Test:  http://127.0.0.1:9601/api/save-cert-of-need?id=1004
	//  should return a 200

	err := http.ListenAndServe(":9831", nil) // set listen port
	if err != nil {
		log.Fatal("ListenAndServe: ", err)
	}

}
