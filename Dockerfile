FROM golang AS build

ADD ./httpServer /mforms/httpServer
ADD ./docs /mforms/docs
ADD ./http-docs /mforms/http-docs
ADD ./data /mforms/data
WORKDIR /mforms/httpServer
RUN go build httpServer.go

# Convert to a single layer image
# Using the Phased build reduced memory
# consumption from over 800MB to 180MB.
FROM clearlinux:latest
COPY --from=build /mforms /mforms
WORKDIR /mforms/httpServer
ENTRYPOINT /mforms/httpServer/httpServer
# Document that the service listens on port 8080.
EXPOSE 9831
