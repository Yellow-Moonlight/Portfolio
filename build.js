const fs = require('fs-extra');
const path = require('path');
const marked = require('marked');
const matter = require('gray-matter');
const { exec } = require('child_process');

const distPath = path.join(__dirname, 'dist');
const projectsPath = path.join(__dirname, 'projects');
const templatesPath = path.join(__dirname, 'templates');
const assetsPath = path.join(__dirname, 'assets');

async function build() {
    try {
        // 1. Clean the dist directory
        await fs.emptyDir(distPath);
        console.log('Cleaned dist directory.');

        // 2. Process and copy assets
        await fs.ensureDir(path.join(distPath, 'assets'));

        // Process images using the shell script
        const imageProcessPromise = new Promise((resolve, reject) => {
            const command = `bash script/process-images.sh ${path.join(assetsPath, 'images')} ${path.join(distPath, 'assets', 'images')}`;
            console.log(`Running command: ${command}`);
            exec(command, (error, stdout, stderr) => {
                if (error) {
                    console.error(`Image processing script error: ${error}`);
                    reject(error);
                    return;
                }
                console.log(`Image processing script output: \n${stdout}`);
                if (stderr) {
                    console.error(`Image processing script stderr: \n${stderr}`);
                }
                resolve();
            });
        });
        await imageProcessPromise;
        console.log('Finished processing images.');

        // Copy other asset files and directories
        const assetContents = await fs.readdir(assetsPath);
        for (const item of assetContents) {
            const sourcePath = path.join(assetsPath, item);
            const destPath = path.join(distPath, 'assets', item);
            const isDirectory = (await fs.stat(sourcePath)).isDirectory();

            if (isDirectory && item !== 'images') {
                await fs.copy(sourcePath, destPath);
                console.log(`Copied asset directory: ${item}`);
            } else if (!isDirectory && item !== '.DS_Store') {
                await fs.copy(sourcePath, destPath);
                console.log(`Copied asset file: ${item}`);
            }
        }

        // 3. Read templates
        const worksTemplate = await fs.readFile(path.join(templatesPath, 'works.template.html'), 'utf-8');
        const projectTemplate = await fs.readFile(path.join(templatesPath, 'project.template.html'), 'utf-8');
        console.log('Read templates.');

        // 4. Process projects
        const projectFiles = await fs.readdir(projectsPath);
        const markdownFiles = projectFiles.filter(file => file.endsWith('.md'));

        const projectsData = [];

        for (const file of markdownFiles) {
            const filePath = path.join(projectsPath, file);
            const fileContent = await fs.readFile(filePath, 'utf-8');
            let { data, content } = matter(fileContent);

            // Change image extensions to .png to match dithered output
            if (data.featured_image) {
                data.featured_image = data.featured_image.replace(/\.(jpg|jpeg|JPG|JPEG)$/g, '.png');
            }
            content = content.replace(/\.(jpg|jpeg|JPG|JPEG)\)/g, '.png)');

            const htmlContent = marked.parse(content);
            const slug = path.basename(file, '.md');

            projectsData.push({
                ...data, // title, summary, date, featured_image
                slug,
                htmlContent
            });
        }

        // Sort projects by date (optional, assuming 'date' can be sorted)
        projectsData.sort((a, b) => new Date(b.date) - new Date(a.date));
        console.log(`Found and processed ${projectsData.length} projects.`);

        // 5. Generate individual project pages
        const projectsDistPath = path.join(distPath, 'projects');
        await fs.ensureDir(projectsDistPath);

        for (const project of projectsData) {
            let projectHtml = projectTemplate
                .replace(/{{TITLE}}/g, project.title)
                .replace(/{{SUMMARY}}/g, project.summary)
                .replace(/{{DATE}}/g, project.date)
                .replace(/{{CONTENT}}/g, project.htmlContent);
            
            await fs.writeFile(path.join(projectsDistPath, `${project.slug}.html`), projectHtml);
        }
        console.log('Generated individual project pages.');

        // 6. Generate works.html
        const projectsGrid = projectsData.map(project => {
            return `
            <div class="article">
                <a href="projects/${project.slug}.html">
                    <div class="image-center">
                        <div class="featured-img" style="background-image: url(${project.featured_image});">
                        </div>
                    </div>
                    <div class="text">
                        <h2 class="entry-title">${project.title}</h2>
                        <p class="index-summary">
                            ${project.summary}
                        </p>
                        <time class="published">${project.date}</time>
                    </div>
                </a>
            </div>`;
        }).join('');

        const worksHtml = worksTemplate.replace('<!-- PROJECTS_GRID -->', projectsGrid);
        await fs.writeFile(path.join(distPath, 'works.html'), worksHtml);
        console.log('Generated works.html.');

        // 7. Copy other root HTML files
        const rootFiles = await fs.readdir(__dirname);
        const rootHtmlFiles = rootFiles.filter(file => file.endsWith('.html') && file !== 'works.html');
        for (const file of rootHtmlFiles) {
            await fs.copy(path.join(__dirname, file), path.join(distPath, file));
        }
        console.log('Copied root HTML files.');

        console.log('\nBuild process completed successfully!');

    } catch (error) {
        console.error('Error during build process:', error);
    }
}

build();
