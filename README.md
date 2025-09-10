# AbyssAI
SIH problem Statement XY Solution, Team name: ; Collaborators: @shivamm-verma , @damanpreet2005 ,  

## Deployed on [Vercel](https://github.com/vercel/vercel)
> Check it out!
[https://abyss-ai.vercel.app/](https://abyss-ai.vercel.app/)

## 📐 Frontend local setup
```sh
git clone https://github.com/shivamm-verma/AbyssAI.git
```
```sh
cd client
```
```sh
npm install
```
```sh
npm run dev
```


## 🗃️ File Structuring

- Frontend: /client
- backend: /server
## Mermaid
```mermaid
flowchart TD

    A["Raw eDNA Reads<br/>FASTQ Files"] --> B["Stage 1: Preprocessing & De<br/><br/>Quality Filtering"]
    B --> C["Error Correction<br/>DADA2"]
    C --> D["Output: Cleaned ASV Table"]

    D --> E["Stage 2: Initial Clustering<br/><br/>Sequence Identity Clustering<br/>VSEARCH"]
    E --> F["Output: MOTU Table & Rep Sequences"]

    F --> G["Stage 3: AI-Powered Pattern"]
    
    G1["Feature Extraction<br/>k-mer frequency"] --> G2["Dimensionality Reduction<br/>UMAP"]
    G2 --> G3["Clustering<br/>HDBSCAN"]

    G --> G1
    G1 --> G2
    G2 --> G3

    G3 --> H["Stage 4: Interpretation & Output<br/><br/>Taxonomy Assignment<br/>with Confidence Scores"]
    H --> I["Abundance Estimation"]
    I --> J["Novel Cluster Analysis"]
    J --> K["Final Biodiversity Report"]
```