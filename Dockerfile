FROM microsoft/dotnet:latest

# Create directory for the app source code
RUN mkdir -p /usr/src/hackerspulse
WORKDIR /usr/src/hackerspulse

# Copy the source and restore dependencies
COPY . /usr/src/hackerspulse
RUN dotnet restore

# Expose the port and start the app
EXPOSE 5000
CMD [ "dotnet", "run" ]
