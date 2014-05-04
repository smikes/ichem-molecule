(function () {
    'use strict';

    var inchilib,
        Molecule;

    module.exports = function setupInchiMethods(mol, lib) {
        Molecule = mol;
        inchilib = lib;

        Molecule.prototype.getInchi = getInchi;
        Molecule.fromInchi = fromInchi;
        Molecule.fromInchiStruct = fromInchiStruct;
    };

    /**
     Get the InChI code for the current molecule

     @method getInchi
     @param {Function} callback Function which receives the InChI code
     @param {String}   callback.err Null if no error
     @param {String}   callback.inchi  InChI code
     @param {String}   callback.inchikey  InChI key (hash) calculated from code
     */
    function getInchi(callback) {
        var self = this;

        inchilib.GetInChIFromMolecule(self, function (err, result) {
            process.nextTick(function () {
                callback(err, result.inchi, result.inchikey);
            });
        });
    };

    /**
     Create a molecule from an InChI code, asynchronously

     @static
     @method fromInchi
     @param {String} inchi  the InChI code
     @param {Function} callback callback function to call with completed molecule
     @param {String} callback.err  Null if no error
     @param {Molecule} callback.molecule  Molecule object
     */
    function fromInchi(inchiCode, callback) {
        inchilib.GetStructFromINCHI(inchiCode, function (err, struct) {
            if (err) {
                callback(err);
                return;
            }

            var m = fromInchiStruct(struct);

            process.nextTick(function () {
                callback(null, m);
            });
        });
    };

    /**
     Create a molecule from an InChI struct, synchronously

     @static
     @method fromInchiStruct
     @param {String} struct  the InChI structure
     @return {Molecule}  Molecule object
     */
    function fromInchiStruct(struct) {
        var m = new Molecule();

        m.atoms = struct.atom;

        m.atoms.forEach(function (a, from) {
            a.bonds.forEach(function (b) {
                m.addBond_internal(from, b.neighbor, b.bond_type);
            });
        });

        m.stereo0D = struct.stereo0D;
    }


}());
