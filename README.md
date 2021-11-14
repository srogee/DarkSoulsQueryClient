# DarkSoulsQueryClient
 
Simple browser page for displaying which bosses in Dark Souls III have been killed. Designed for use in a streaming client like OBS. Requires [DarkSoulsQueryServer](https://github.com/srogee/DarkSoulsQueryServer) to be running on the local machine to work correctly.

## How to use
1. Download and extract the latest release of DarkSoulsQueryServer
2. Download and extract the latest release of this repository
3. Open OBS
4. Click the plus button and add a Browser source

    ![install-1](https://raw.githubusercontent.com/srogee/DarkSoulsQueryClient/main/tutorial/install-1.png)

5. Select Create New and give your source a name, then click OK

    ![install-2](https://raw.githubusercontent.com/srogee/DarkSoulsQueryClient/main/tutorial/install-2.png)

6. Select Local File and browse to index.html, then click OK

    ![install-3](https://raw.githubusercontent.com/srogee/DarkSoulsQueryClient/main/tutorial/install-3.png)

7. At this point, the tracker should be visible in your scene:

    ![install-4](https://raw.githubusercontent.com/srogee/DarkSoulsQueryClient/main/tutorial/install-4.png)

8. Now just make sure DarkSoulsQueryServer.exe and Dark Souls III are running, and the tracker will mark which bosses have been defeated automatically.
