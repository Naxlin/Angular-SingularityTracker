const express = require('express');
const Singularity = require('../models/singularity');
const sequenceGenerator = require('./sequenceGenerator');
const router = express.Router();

// Function to return an error if one occurs, reduces code!
function returnError(res, err) {
    res.status(500).json({message: "An error occurred!", error: err});
}

router.get('/', (req, res, next) => {
    Singularity.find().then(sings => {
        res.status(200).json({message: "Singularities fetched successfully!", singularities: sings});
    }).catch(err => {
        returnError(res, err);
    });
});

router.get('/:id', (req, res, next) => {
    Singularity.findOne({"id": req.params.id}).populate('compoundOf').then(sing => {
        res.status(200).json({message: "Singularity fetched successfully!", singularity: sing});
    }).catch(err => {
        returnError(res, err);
    });
});

router.post('/', (req, res, next) => {
  const maxSingularityId = sequenceGenerator.nextId("singularities");

  const singularity = new Singularity({
      id: maxSingularityId,
      name: req.body.name,
      imageUrl: req.body.imageUrl,
      material: req.body.material,
      amount: req.body.amount,
      compoundOf: req.body.compoundOf
  });

  singularity.save()
    .then(createdSingularity => {
    res.status(201).json({
        message: 'Singularity added successfully',
        singularity: createdSingularity
    });
    })
    .catch(error => {
        res.status(500).json({
        message: 'An error occurred',
        error: error
    });
  });
});

router.put('/:id', (req, res, next) => {
  Singularity.findOne({ id: req.params.id })
    .then(singularity => {
        singularity.name = req.body.name;
        singularity.description = req.body.description;
        singularity.url = req.body.url;

    Singularity.updateOne({ id: req.params.id }, singularity)
        .then(result => {
        res.status(204).json({
            message: 'Singularity updated successfully'
        })
        })
        .catch(error => {
            res.status(500).json({
            message: 'An error occurred',
            error: error
        });
        });
    })
    .catch(error => {
    res.status(500).json({
        message: 'Singularity not found.',
        error: { singularity: 'Singularity not found'}
    });
  });
});

router.delete("/:id", (req, res, next) => {
  Singularity.findOne({ id: req.params.id })
    .then(singularity => {
    Singularity.deleteOne({ id: req.params.id })
        .then(result => {
        res.status(204).json({
            message: "Singularity deleted successfully"
        });
        })
        .catch(error => {
            res.status(500).json({
            message: 'An error occurred',
            error: error
        });
        })
    })
    .catch(error => {
    res.status(500).json({
        message: 'Singularity not found.',
        error: { singularity: 'Singularity not found'}
    });
  });
});

module.exports = router; 