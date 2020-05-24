const test = require('tape');
const { determineResultTypes } = require('../classes/answers');

test('[classes/answers] determineResultTypes', (assert) => {
  const allBlanks = {
    0: {
      Aang: { answer: '' },
      Toph: { answer: '' },
    },
    1: {
      Aang: { answer: '' },
      Toph: { answer: '' },
    }
  };
  let actual = determineResultTypes(allBlanks);
  assert.deepEquals(actual, {
    0: {
      Aang: { answer: '', type: 'blank' },
      Toph: { answer: '', type: 'blank' },
    },
    1: {
      Aang: { answer: '', type: 'blank' },
      Toph: { answer: '', type: 'blank' },
    }
  }, 'determines blank type');

  const allOriginal = {
    0: {
      Aang: { answer: 'air' },
      Toph: { answer: 'earth' },
    },
    1: {
      Aang: { answer: 'airr' },
      Toph: { answer: 'earth' },
    },
    2: {
      Aang: { answer: 'Fire' },
      Toph: { answer: 'firebender' },
    }
  };
  actual = determineResultTypes(allOriginal);
  assert.deepEquals(actual, {
    0: {
      Aang: { answer: 'air', type: 'original' },
      Toph: { answer: 'earth', type: 'original' },
    },
    1: {
      Aang: { answer: 'airr', type: 'original' },
      Toph: { answer: 'earth', type: 'original' },
    },
    2: {
      Aang: { answer: 'Fire', type: 'original' },
      Toph: { answer: 'firebender', type: 'original' },
    }
  }, 'determines original type');

  const someDuplicates = {
    0: {
      Aang: { answer: 'air' },
      Toph: { answer: 'earth' },
      Zuko: { answer: 'fire' },
      Katara: { answer: 'water' },
    },
    1: {
      Aang: { answer: 'mo\'mo ' },
      Toph: { answer: 'Momo' },
      Zuko: { answer: 'mo-mo' },
      Katara: { answer: 'mo_mo' },
    },
    2: {
      Aang: { answer: '' },
      Toph: { answer: '' },
      Zuko: { answer: 'bending' },
      Katara: { answer: 'bending' },
    }
  };

  actual = determineResultTypes(someDuplicates);
  assert.deepEquals(actual, {
    0: {
      Aang: { answer: 'air', type: 'original' },
      Toph: { answer: 'earth', type: 'original' },
      Zuko: { answer: 'fire', type: 'original' },
      Katara: { answer: 'water', type: 'original' },
    },
    1: {
      Aang: { answer: 'mo\'mo ', type: 'duplicate' },
      Toph: { answer: 'Momo', type: 'duplicate' },
      Zuko: { answer: 'mo-mo', type: 'duplicate' },
      Katara: { answer: 'mo_mo', type: 'duplicate' },
    },
    2: {
      Aang: { answer: '', type: 'blank' },
      Toph: { answer: '', type: 'blank' },
      Zuko: { answer: 'bending', type: 'duplicate' },
      Katara: { answer: 'bending', type: 'duplicate' },
    }
  }, 'determines duplicate types');

  const startsWithWrongLetter = {
    0: {
      Aang: { answer: 'Air' },
      Toph: { answer: 'earth' }
    },
    1: {
      Aang: { answer: 'avatar' },
      Toph: { answer: 'aang' }
    },
    2: {
      Aang: { answer: '\'Avatar' },
      Toph: { answer: 'a-va-tar' }
    },
  };

  actual = determineResultTypes(startsWithWrongLetter, 'A');

  assert.deepEquals(actual, {
    0: {
      Aang: { answer: 'Air', type: 'original' },
      Toph: { answer: 'earth', type: 'incorrect' },
    },
    1: {
      Aang: { answer: 'avatar', type: 'original' },
      Toph: { answer: 'aang', type: 'original' },
    },
    2: {
      Aang: { answer: '\'Avatar', type: 'duplicate' },
      Toph: { answer: 'a-va-tar', type: 'duplicate' },
    }
  }, 'determines wrong starting letter');


  assert.end();
});
